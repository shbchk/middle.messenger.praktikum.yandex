import Handlebars from 'handlebars';
import './modalButton.less';
import Block from '../../utils/Block';

interface IModalButton {
  type: string;
  text: string;
  link?: string;
  events?: Record<string, (event: Event) => void>;
}

export default class ModalButton extends Block<IModalButton> {
  constructor(props: IModalButton) {
    super('button', props);
  }

  init() {}

  render() {
    this.element!.setAttribute('type', this.props.type);
    this.element!.classList.add('modal__button');
    (this.element! as HTMLAnchorElement).textContent = this.props.text;

    return this.compile(Handlebars.compile(''), this.props);
  }
}
