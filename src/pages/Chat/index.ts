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
import ChatsController from '../../controllers/ChatsController';
import authController from '../../controllers/AuthController';
import Router from '../../utils/Router';
import { ROUTES } from '../../ROUTES';
import store, { withStore } from '../../utils/Store';

const router = new Router();

class ChatBase extends Block {
  init() {
    authController.checkAuth().then(async (loggedIn) => {
      if (!loggedIn) {
        router.go(ROUTES.index);
      }
    });

    ChatsController.getChats();

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

            const textarea = document.querySelector(
              '#message',
            ) as HTMLTextAreaElement;
            const text = textarea.value;
            store.getState().chat.api!.send({ content: text, type: 'message' });
            textarea.value = '';
          },
        },
      }),
    });
  }

  render() {
    authController.checkAuth().then(async (loggedIn) => {
      if (!loggedIn) {
        router.go(ROUTES.index);
      }
    });

    document.title = 'Yandex.Messenger';
    this.element!.classList.add('chat-layout');
    return this.compile(Handlebars.compile(chatTemplate), this.props);
  }
}

const withMessages = withStore((state) => ({
  chat: { ...state.chat },
}));

const Chat = withMessages(ChatBase as typeof Block);

export default Chat;
