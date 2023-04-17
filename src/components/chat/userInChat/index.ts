import Handlebars from 'handlebars';
import Block from '../../../utils/Block';
import { userinchat } from './userinchat.tmpl';
import Button from '../../button';
import ChatsController from '../../../controllers/ChatsController';
import store from '../../../utils/Store';

interface IUserInChat {
  name: string;
  userId: number;
  events?: Record<string, (event: Event) => void>;
}

export default class UserInChat extends Block<IUserInChat> {
  protected init(): void {
    this.children.removeButton = new Button({
      text: '☓',
      classList: ['remove-user-button'],
      events: {
        click: () => {
          ChatsController.deleteUsers({
            chatId: store.getState().chat.currentChatId as number,
            users: [this.props.userId],
          });
        },
      },
    });
  }

  render() {
    this.element?.classList.add('messages_user-in-chat');
    return this.compile(Handlebars.compile(userinchat), this.props);
  }
}
