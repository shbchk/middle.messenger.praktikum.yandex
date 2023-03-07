import Handlebars from 'handlebars'

import ('./modal.less')
import modal from 'bundle-text:./modal.hbs'

export const Modal = ({ header, modalContent }) => Handlebars.compile(modal)({header, modalContent})
