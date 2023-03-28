import Handlebars from 'handlebars';
import { chatTemplate } from './chat.tmpl';
import './chat.less';
import Block from '../../utils/Block';

interface IChat {}

export default class Chat extends Block<IChat> {
  render() {
    document.title = 'Yandex.Messenger';
    this.element!.classList.add('chat-layout');
    return this.compile(Handlebars.compile(chatTemplate), this.props);
  }
}
