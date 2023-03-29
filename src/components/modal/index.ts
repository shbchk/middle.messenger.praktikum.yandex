import Handlebars from 'handlebars';
import Block from '../../utils/Block';

import './modal.scss';
import { modalTemplate } from './modal.tmpl';

interface IModal {
  modalHeader: string;
  modalContent: Block;
}

export default class Modal extends Block<IModal> {
  render() {
    this.element!.classList.add('modal__backdrop');
    return this.compile(Handlebars.compile(modalTemplate), this.props);
  }
}
