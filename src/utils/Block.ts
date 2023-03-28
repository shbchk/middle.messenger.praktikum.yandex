import { nanoid } from 'nanoid';
import Handlebars, { TemplateDelegate } from 'handlebars';
import EventBus from './EventBus';

class Block<P extends Record<string, any> = any> {
  private static EVENTS: Record<string, string> = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  private _element: HTMLElement | null = null;

  protected props: P;

  private _eventBus: () => EventBus;

  private _meta: { tagName: string; props: any };

  public id: string;

  // eslint-disable-next-line no-use-before-define
  protected children: Record<string, Block | Block[]>;

  constructor(propsAndChildren: P, tagName: string = 'div') {
    const eventBus = new EventBus();
    const { children, props } = this._getChildren(propsAndChildren);

    this.children = children;

    this._meta = {
      tagName,
      props,
    };

    this.props = this._makePropsProxy(props);

    this._eventBus = () => eventBus;

    this.props = this._makePropsProxy(props);

    this._registerEvents(eventBus);

    this.id = nanoid();

    eventBus.emit(Block.EVENTS.INIT);
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  private _init() {
    this._createResources();
    this.init();
    this._eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  protected init() {}

  private _componentDidMount() {
    this.componentDidMount();
  }

  protected componentDidMount() {}

  public dispatchComponentDidMount() {
    this._eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: P, newProps: P) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this._removeEvents();
      this._eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  protected componentDidUpdate(oldProps: P, newProps: P) {
    return true;
  }

  public setProps = (nextProps: Partial<P>): void => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  private _render(): void {
    this._element!.innerHTML = '';
    const block = this.render();
    this._element!.append(block);

    this._addEvents();
  }

  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  // protected compile(template: TemplateDelegate, context: any) {
  //   const contextAndStubs = { ...context };
  //   Object.entries(this.children).forEach(([name, component]) => {
  //     contextAndStubs[name] = `<div data-id="${component.id}"></div>`;
  //   });

  //   const html = template(contextAndStubs);

  //   const temp = document.createElement('template');

  //   temp.innerHTML = html;

  //   Object.entries(this.children).forEach(([_, component]) => {
  //     const stub = temp.content.querySelector(`[data-id="${component.id}"]`);
  //     if (!stub) {
  //       return;
  //     }
  //     stub.replaceWith(component.getContent()!);
  //   });

  //   return temp.content;
  // }

  protected compile(template: TemplateDelegate, context: any) {
    const contextAndStubs = { ...context };

    Object.entries(this.children).forEach(([name, component]) => {
      if (Array.isArray(component)) {
        contextAndStubs[name] = component.map(
          (child) => `<div data-id="${child.id}"></div>`,
        );
      } else {
        contextAndStubs[name] = `<div data-id="${component.id}"></div>`;
      }
    });

    const html = template(contextAndStubs);

    const temp = document.createElement('template');

    temp.innerHTML = html;

    const replaceStub = (component: Block) => {
      const stub = temp.content.querySelector(`[data-id="${component.id}"]`);

      if (!stub) {
        return;
      }

      component.getContent()?.append(...Array.from(stub.childNodes));

      stub.replaceWith(component.getContent()!);
    };

    // eslint-disable-next-line no-unused-vars
    Object.entries(this.children).forEach(([_, component]) => {
      if (Array.isArray(component)) {
        component.forEach(replaceStub);
      } else {
        replaceStub(component);
      }
    });

    return temp.content;
  }

  private _addEvents() {
    const { events = {} } = this.props as P & {
      // eslint-disable-next-line no-unused-vars
      events: Record<string, (event: Event) => void>;
    };

    Object.keys(events).forEach((eventName) => {
      this._element!.addEventListener(eventName, events[eventName]);
    });
  }

  private _removeEvents() {
    const { events = {} } = this.props as P & {
      // eslint-disable-next-line no-unused-vars
      events: Record<string, (event: Event) => void>;
    };

    Object.keys(events).forEach((eventName) => {
      this._element!.removeEventListener(eventName, events[eventName]);
    });
  }

  public getContent() {
    return this.element;
  }

  private _getChildren(childrenAndProps: P): {
    props: P;
    children: Record<string, Block | Block[]>;
  } {
    const props: Record<string, unknown> = {};
    const children: Record<string, Block | Block[]> = {};

    Object.entries(childrenAndProps).forEach(([key, value]) => {
      if (
        Array.isArray(value) &&
        value.length > 0 &&
        value.every((v) => v instanceof Block)
      ) {
        children[key as string] = value;
      } else if (value instanceof Block) {
        children[key as string] = value;
      } else {
        props[key] = value;
      }
    });

    return { props: props as P, children };
  }

  private _makePropsProxy(props: P) {
    const self = this;

    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },

      set(target, prop: string, value) {
        const oldTarget = { ...target };
        // eslint-disable-next-line no-param-reassign
        target[prop as keyof P] = value;
        self._eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },

      deleteProperty() {
        throw new Error('Нельзя удалять свойства этого объекта');
      },
    });
  }

  private _createDocumentElement(tagName: string) {
    const element = document.createElement(tagName);
    element.setAttribute('data-id', this.id);
    return element;
  }

  protected show() {
    this.getContent()!.style.display = 'block';
  }

  protected hide() {
    this.getContent()!.style.display = 'none';
  }
}

export default Block;
