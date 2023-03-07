import Handlebars from 'handlebars'
import modalButton from 'bundle-text:./modalButton.hbs'
import ('./modalButton.less')

export const ModalButton = ({ type, text }) => Handlebars.compile(modalButton)({ type, text })