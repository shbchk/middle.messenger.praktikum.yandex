import Handlebars from 'handlebars';
import chat from 'bundle-text:./chat.hbs';
import('./chat.less');

export const Chat = () => {
  document.title = 'Yandex.Messenger';
  return Handlebars.compile(chat)();
};
