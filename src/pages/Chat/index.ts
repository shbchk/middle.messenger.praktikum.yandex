import Handlebars from 'handlebars';
import { chatTemplate } from './chat.tmpl';
import './chat.less';

export const Chat = () => {
  document.title = 'Yandex.Messenger';
  return Handlebars.compile(chatTemplate)(null);
};
