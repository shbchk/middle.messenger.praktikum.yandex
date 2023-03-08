import Handlebars from 'handlebars';

import('./modal.less');
import modal from 'bundle-text:./modal.hbs';

export const Modal = ({ modalHeader, modalContent }) => Handlebars.compile(modal)({ modalHeader, modalContent });
