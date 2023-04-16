import Handlebars from 'handlebars';
import Block from '../../../utils/Block';
import Message, { IMessage } from '../message';
import { messagesTemplate } from './messages.tmpl';
import store, { withStore } from '../../../utils/Store';
import Button from '../../button';
import render from '../../../utils/render';
import Modal from '../../modal';
import InputGroup from '../../inputGroup';
import Input from '../../input';
import UsersController from '../../../controllers/UsersController';
import AddUsers from '../../addUsers';
import ChatsController from '../../../controllers/ChatsController';
import { IState, IUser } from '../../../typings/interfaces';

interface IChat {
  messagesArray: IMessage[];
  messagesInput: Block;
  chat: IState['chat'];
}

class MessagesBase extends Block<IChat> {
  protected init(): void {
    this.children.addUserButton = new Button({
      type: 'button',
      text: '+',
      classList: ['messages__add-user-button'],
      events: {
        click: (event) => {
          event.preventDefault();
          render(
            '#root',
            new Modal({
              modalHeader: 'Добавить пользователя',
              modalContent: new AddUsers({
                inputgroups: [
                  new InputGroup({
                    input: new Input({
                      inputName: 'login',
                      inputId: 'login',
                      inputType: 'login',
                      inputClassList: ['modal__input'],
                    }),
                    errorMessage: 'Не менее трех символов',
                    inputId: 'login',
                    inputLabel: 'Логин пользователя',
                  }),
                ],
                searchButton: new Button({
                  text: 'Найти пользователя',
                  classList: ['modal__button'],
                  type: 'submit',
                }),
                addButton: new Button({
                  text: 'Добавить выбранных',
                  classList: ['modal__button'],
                  type: 'button',
                  events: {
                    click: (e: Event) => {
                      e.preventDefault();
                      ChatsController.addUsers({
                        users: (
                          store.getState().addUsers?.usersToAdd as IUser[]
                        ).map((user) => user.id),
                        chatId: store.getState().chat.currentChatId as number,
                      });
                    },
                  },
                }),
                formID: 'addUserByLogin',
                events: {
                  submit: (e: Event) => {
                    e.preventDefault();
                    const { value } = document.querySelector(
                      '#login',
                    ) as HTMLInputElement;
                    UsersController.getUserByLogin({ login: value });
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
    this.element!.classList.add('messages');

    console.log('this.props.chat.messages', this.props.chat.messages);

    this.children.messagesArray = this.props.chat.messages.map(
      (message) =>
        new Message({
          text: message.content,
          content_type: message.type,
          time: message.time,
          user_id: message.user_id,
          id: message.id,
        }),
    );

    console.log('this.children.messagesArray', this.children.messagesArray);

    return this.compile(Handlebars.compile(messagesTemplate), {
      ...this.props,
      userList: Array.isArray(this.props.chat!.users)
        ? this.props.chat!.users.map((user: IUser) => user.first_name)
        : '',
    });
  }
}

const withMessages = withStore<IChat>((state) => ({
  chat: { ...state.chat },
  chats: { ...state.chats },
}));

const Chatlist = withMessages(MessagesBase as typeof Block);

export default Chatlist;
