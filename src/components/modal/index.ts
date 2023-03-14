import Handlebars from 'handlebars';

import './modal.less';
import { modalTemplate } from './modal.tmpl';

interface IModal {
  modalHeader: string;
  modalContent: string;
}

export const Modal = ({ modalHeader, modalContent }: IModal) =>
  Handlebars.compile(modalTemplate)({ modalHeader, modalContent });
