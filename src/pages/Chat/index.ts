import Handlebars from 'handlebars';
import { chatTemplate } from './chat.tmpl';
import './chat.scss';
import Block from '../../utils/Block';
import Chatlist from '../../components/chat/chatlist';
import ChatSearch from '../../components/chat/chatSearch';
import Input from '../../components/input';
import { validateField } from '../../utils/validateField';
import Messages from '../../components/chat/messages';
import MessageInput from '../../components/chat/messageInput';
import Textarea from '../../components/textarea';
import Message, { IMessage } from '../../components/chat/message';
import ChatsController from '../../controllers/ChatsController';

export default class Chat extends Block {
  init() {
    // ПЕРВЫЙ ВЫЗОВ ChatsController.getChats(), еще раз я дергаю этот же контроллер в components/chat/chatlist/index.ts
    ChatsController.getChats();

    console.log('дернулся init() в Chat');

    this.children.chatList = new Chatlist({
      chatSearch: new ChatSearch({
        chatSearchInput: new Input({
          inputClassList: ['chatlist__search-input'],
          inputId: 'search-input',
          inputName: 'search-input',
          inputType: 'text',
          inputPlaceholder: '🔎 search',
          events: {
            focus: (event) => validateField(event, 'search'),
            blur: (event) => validateField(event, 'search'),
            input: (event) => validateField(event, 'search'),
          },
        }),
        events: {
          submit: (event) => {
            event.preventDefault();
            validateField(event, 'search');
          },
        },
      }),
    });

    this.children.messages = new Messages({
      messagesArray: [].reverse().map((msg: IMessage) => new Message(msg)),
      messagesInput: new MessageInput({
        textarea: new Textarea({
          id: 'message',
          rows: 1,
          name: 'message',
          placeholder: 'Сообщение',
          classList: ['messages__message-textarea'],
          events: {
            input: () => {
              const el = document.getElementById(
                'message',
              ) as HTMLTextAreaElement;
              if (!el) {
                return;
              }
              (el.parentNode! as HTMLLabelElement).dataset.value = el!.value;
            },
          },
        }),
        events: {
          submit: (event) => {
            event.preventDefault();
            validateField(event, 'message-input-form');
          },
        },
      }),
    });
  }

  render() {
    document.title = 'Yandex.Messenger';
    this.element!.classList.add('chat-layout');
    return this.compile(Handlebars.compile(chatTemplate), this.props);
  }
}
