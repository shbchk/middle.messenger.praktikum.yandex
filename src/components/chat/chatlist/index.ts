import Handlebars from 'handlebars';
import Block from '../../../utils/Block';
import { chatlistTemplate } from './chatlist.tmpl';
import { withStore } from '../../../utils/Store';
import ChatPreview from '../chatPreview';
import Link from '../../link';
import { ROUTES } from '../../../ROUTES';
import Router from '../../../utils/Router';
import Button from '../../button';
import './chatlist.scss';
import render from '../../../utils/render';
import Modal from '../../modal';
import AuthForm from '../../AuthForm';
import InputGroup from '../../inputGroup';
import Input from '../../input';
import ChatsController from '../../../controllers/ChatsController';
import { IChat } from '../../../typings/interfaces';

const router = new Router();

interface IChatlist {
  chatSearch: Block | string;
  chats?: {
    data: IChat[];
  };
}

class ChatlistBase extends Block<IChatlist> {
  init() {
    this.children.profileLink = new Link({
      href: ROUTES.profile,
      text: 'Профиль',
      classList: ['chatlist__chattext'],
      events: {
        click: (event) => {
          event.preventDefault();
          router.go(ROUTES.profile);
        },
      },
    });

    this.children.addChatButton = new Button({
      type: 'button',
      text: '+',
      classList: ['chatlist__add-chat-button'],
      events: {
        click: (event) => {
          event.preventDefault();
          render(
            '#root',
            new Modal({
              modalHeader: 'Добавить новый чат',
              modalContent: new AuthForm({
                inputgroups: [
                  new InputGroup({
                    input: new Input({
                      inputName: 'title',
                      inputId: 'title',
                      inputType: 'text',
                      inputClassList: ['modal__input'],
                    }),
                    errorMessage: 'Не менее трех символов',
                    inputId: 'title',
                    inputLabel: 'Название чата',
                  }),
                ],
                button: new Button({
                  text: 'Добавить',
                }),
                formID: 'chat-title',
                events: {
                  submit: (e: Event) => {
                    e.preventDefault();
                    const { value } = document.querySelector(
                      '#title',
                    ) as HTMLInputElement;

                    ChatsController.createChat({ title: value }).then(() => {
                      document.querySelector('.modal__backdrop')!.remove();
                    });
                  },
                },
              }),
            }),
          );
        },
      },
    });
  }

  render() {
    this.children.chatPreviews = this.props.chats!.data.map(
      (chatPreview: IChat) => {
        return new ChatPreview(chatPreview);
      },
    );

    this.element!.classList.add('chatlist');
    return this.compile(Handlebars.compile(chatlistTemplate), this.props);
  }
}

const withChatsAndUser = withStore<IChatlist>((state) => ({
  chats: { ...state.chats },
  user: { ...state.user },
}));

const Chatlist = withChatsAndUser(ChatlistBase as typeof Block);

export default Chatlist;
