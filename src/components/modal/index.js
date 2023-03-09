import Handlebars from 'handlebars';

import('./modal.less');
import { modalTemplate } from './modal.tmpl';

export const Modal = ({ modalHeader, modalContent }) => Handlebars.compile(modalTemplate)({ modalHeader, modalContent });
