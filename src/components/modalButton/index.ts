import Handlebars from 'handlebars';
import { modalButtonTemplate } from './modalButton.tmpl';
import './modalButton.less';

interface IModalButton {
  type: string;
  text: string;
  link: string;
}

export const ModalButton = ({ type, text, link }: IModalButton) => Handlebars.compile(modalButtonTemplate)({ type, text, link });
