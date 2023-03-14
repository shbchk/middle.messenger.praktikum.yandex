import Handlebars from 'handlebars';
import { chatTemplate } from './chat.tmpl';
import './chat.less';

export const Chat = () => {
  // eslint-disable-next-line no-undef
  document.title = 'Yandex.Messenger';
  return Handlebars.compile(chatTemplate)(null);
};
