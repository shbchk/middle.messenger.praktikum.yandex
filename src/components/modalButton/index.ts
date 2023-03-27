import Handlebars from 'handlebars';
import './modalButton.less';
import Block from '../../utils/Block';

interface IModalButton {
  type: string;
  text: string;
  link?: string;
  // eslint-disable-next-line no-unused-vars
  events?: Record<string, (event: Event) => void>;
  disabled?: boolean;
  id: string;
}

export default class ModalButton extends Block<IModalButton> {
  constructor(props: IModalButton) {
    super('button', props);
  }

  init() {}

  render() {
    this.element!.setAttribute('type', this.props.type);
    if (this.props.disabled) {
      this.element!.setAttribute('disabled', '');
    }
    this.element!.id = this.props.id;
    this.element!.classList.add('modal__button');
    (this.element! as HTMLAnchorElement).textContent = this.props.text;

    return this.compile(Handlebars.compile(''), this.props);
  }
}
