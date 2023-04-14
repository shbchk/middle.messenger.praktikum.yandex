import Handlebars from 'handlebars';
import Block from '../../utils/Block';

import './modal.scss';
import { modalTemplate } from './modal.tmpl';
import render from '../../utils/render';
import Button from '../button';

interface IModal {
  modalHeader: string;
  modalContent: Block;
}

export default class Modal extends Block<IModal> {
  protected init(): void {
    this.children.modalCloseButton = new Button({
      text: '×',
      type: 'button',
      classList: ['modal__close-button'],
      events: {
        click: (event) => {
          this.remove();
        },
      },
    });
  }

  render() {
    this.element!.classList.add('modal__backdrop');
    return this.compile(Handlebars.compile(modalTemplate), this.props);
  }
}
