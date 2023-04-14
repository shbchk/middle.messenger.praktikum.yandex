import Handlebars from 'handlebars';
import Block from '../../../utils/Block';
import { IMessage } from '../message';
import { messagesTemplate } from './messages.tmpl';
import { IState, withStore } from '../../../utils/Store';
import Button from '../../button';
import { IUser } from '../../../api/AuthAPI';
import render from '../../../utils/render';
import Modal from '../../modal';
import AuthForm from '../../authForm';
import InputGroup from '../../inputGroup';
import Input from '../../input';
import ChatsController from '../../../controllers/ChatsController';

interface IMessages {
  messagesArray: IMessage[];
  messagesInput: Block;
  messages: IState['messages'];
}

class MessagesBase extends Block<IMessages> {
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
                    inputLabel: 'Логин пользователя',
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
    this.element!.classList.add('messages');
    return this.compile(Handlebars.compile(messagesTemplate), {
      ...this.props,
      userList: Array.isArray(this.props.messages!.users)
        ? this.props.messages!.users.map((user: IUser) => user.first_name)
        : '',
    });
  }
}

const withMessages = withStore<IMessages>((state) => ({
  messages: { ...state.messages },
  chats: { ...state.chats },
}));

const Chatlist = withMessages(MessagesBase as typeof Block);

export default Chatlist;
