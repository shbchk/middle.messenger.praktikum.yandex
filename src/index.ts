import 'normalize.css';
import Chatlist from './components/chat/chatlist';
import ChatPreview, { IChat } from './components/chat/chatPreview';
import ChatSearch from './components/chat/chatSearch';
import Message, { IMessage } from './components/chat/message';
import MessageInput from './components/chat/messageInput';
import Messages from './components/chat/messages';
import Input from './components/input';
import Modal from './components/modal';
import Textarea from './components/textarea';
import Chat from './pages/Chat';
import ErrorPage from './pages/ErrorPage';
import PasswordChange from './pages/PasswordChange';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import { validateField } from './utils/validateField';
import './styles/_common.scss';
import Block from './utils/Block';
import Router from './utils/Router';
import { ROUTES } from './ROUTES';
import { ISigninData, IUser } from './api/AuthAPI';
import store from './utils/Store';
import authController from './controllers/AuthController';

// export const currentUser: IUser = {
//   id: 1,
//   first_name: 'Дмитрий',
//   second_name: 'Кучев',
//   display_name: 'Дмитрий Кучев',
//   avatar: 'https://kuchev.com/avatar.jpg',
//   email: 'dmitry@kuchev.com',
//   login: 'kuchev',
//   phone: '+79629420678',
// };

const router = new Router();

const signInProps = {
  modalHeader: 'Авторизация',
  modalContent: new Signin({
    events: {
      submit: (event: Event) => {
        event.preventDefault();
        const isValid = validateField(event, 'signin-form');

        const formData = new FormData(event.target as HTMLFormElement);

        const data = {
          login: '',
          password: '',
        };

        formData.forEach((value, key) => {
          if (key === 'login' || key === 'password') {
            data[key] = value.toString();
          }
        });

        if (isValid) {
          authController.signin(data);
        }
      },
    },
  }),
};

const signUpProps = {
  modalHeader: 'Регистрация',
  modalContent: new Signup({
    events: {
      submit: (event: Event) => {
        event.preventDefault();
        const isValid = validateField(event, 'signup-form');

        const formData = new FormData(event.target as HTMLFormElement);
        const data: Record<string, string> = {};
        formData.forEach((value, key) => {
          data[key] = value.toString();
        });

        if (isValid) {
          authController.signup(data as any);
        }
      },
    },
  }),
};

// const http = new HTTPTransport();
// какбе получаем JSON чатов: const chatsJSON = http.get('https://chats.api/chats')
const chatsJSON = `[
    {
      "id": 123,
      "title": "Ревьюер Практикума",
      "avatar": "https://xsgames.co/randomusers/avatar.php?g=pixel",
      "unread_count": 3,
      "last_message": {
        "user": {
          "id": "12354",
          "first_name": "Ревьюер",
          "second_name": "Практикума",
          "display_name": "Ревьюер Практикума",
          "avatar": "https://xsgames.co/randomusers/avatar.php?g=pixel",
          "email": "my@email.com",
          "login": "userLogin",
          "phone": "8(911)-222-33-22"
        },
        "time": "2023-03-27T14:22:22.000Z",
        "content": "Отличная работа, молодец!"
      }
    }
  ]`;
const chats = JSON.parse(chatsJSON);

const messagesJSON = `[
    {
      "id": 123,
      "user": {
          "id": 12354,
          "first_name": "Ревьюер",
          "second_name": "Практикума",
          "display_name": "Ревьюер Практикума",
          "avatar": "https://xsgames.co/randomusers/avatar.php?g=pixel",
          "email": "my@email.com",
          "login": "userLogin",
          "phone": "8(911)-222-33-22"
        },
      "time": "2023-03-27T14:22:22.000Z",
      "content_type": "text",
      "content": "Отличная работа, молодец!"
    },
    {
      "id": 124,
      "user": {
        "id": 12354,
        "first_name": "Ревьюер",
        "second_name": "Практикума",
        "display_name": "Ревьюер Практикума",
        "avatar": "https://xsgames.co/randomusers/avatar.php?g=pixel",
        "email": "my@email.com",
        "login": "userLogin",
        "phone": "8(911)-222-33-22"
      },
      "time": "2023-03-27T14:22:22.000Z",
      "content_type": "image",
      "content": "https://source.unsplash.com/random/1600x900/?img=1"
    },
    {
      "id": 125,
      "user": {
          "id": 1,
          "first_name": "Дмитрий",
          "second_name": "Кучев",
          "display_name": "Дмитрий Кучев",
          "avatar": "https://xsgames.co/randomusers/avatar.php?g=pixel",
          "email": "my@email.com",
          "login": "userLogin",
          "phone": "8(911)-222-33-22"
        },
      "time": "2023-03-27T14:22:22.000Z",
      "content_type": "text",
      "content": "Thanks dude! 👍"
    },
    {
      "id": 126,
      "user": {
        "id": 1,
        "first_name": "Ревьюер",
        "second_name": "Практикума",
        "display_name": "Ревьюер Практикума",
        "avatar": "https://xsgames.co/randomusers/avatar.php?g=pixel",
        "email": "my@email.com",
        "login": "userLogin",
        "phone": "8(911)-222-33-22"
      },
      "time": "2023-03-27T14:22:22.000Z",
      "content_type": "image",
      "content": "https://source.unsplash.com/random/1600x900/?img=1"
    }
  ]`;
const messages = JSON.parse(messagesJSON);

const chatProps = {
  chatList: new Chatlist({
    // user: store.getState().user.data as IUser,
    chatPreviews: chats.map(
      (chatPreview: IChat) => new ChatPreview(chatPreview),
    ),
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
  }),
  messages: new Messages({
    messagesArray: messages.reverse().map((msg: IMessage) => new Message(msg)),
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
  }),
};

router
  .use(ROUTES.index, Modal as typeof Block, signInProps)
  .use(ROUTES.signin, Modal as typeof Block, signInProps)
  .use(ROUTES.signup, Modal as typeof Block, signUpProps)
  .use(
    ROUTES.profile,
    Profile as typeof Block,
    // store.getState().user.data as IUser,
  )
  .use(ROUTES.profileEdit, ProfileEdit as typeof Block, {
    // user: store.getState().user.data as IUser,
    events: {
      submit: (event: Event) => {
        event.preventDefault();
        validateField(event, 'profileEdit');
      },
    },
  })
  .use(ROUTES.password, PasswordChange as typeof Block, {
    // user: store.getState().user.data as IUser,
    events: {
      submit: (event: Event) => {
        event.preventDefault();
        validateField(event, 'profileEdit');
      },
    },
  })
  .use(ROUTES.chat, Chat as typeof Block, chatProps)
  .use(ROUTES.err404, ErrorPage as typeof Block, {
    errorCode: '😱',
    errorMessage: 'Ой!',
  })
  .use(ROUTES.err, ErrorPage as typeof Block, {
    errorCode: '😱',
    errorMessage: 'Ой!',
  })
  .start();
