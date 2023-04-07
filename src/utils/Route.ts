// import Block from './Block';
import Block from './Block';
import isEqual from './isEqual';
import render from './render';

export default class Route {
  private _pathname: string;

  private _blockClass: typeof Block;

  private _block: Block | null;

  private _props: Record<string, any>;

  constructor(
    pathname: string,
    view: typeof Block,
    props: Record<string, any>,
  ) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.remove();
    }
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname);
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass(this._props);
    }

    render('#root', this._block);
  }
}
