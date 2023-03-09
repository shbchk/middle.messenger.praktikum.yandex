import Handlebars from 'handlebars';
import { modalButtonTemplate } from './modalButton.tmpl';
import('./modalButton.less');

export const ModalButton = ({ type, text, link }) => Handlebars.compile(modalButtonTemplate)({ type, text, link });
