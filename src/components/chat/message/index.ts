import Handlebars from 'handlebars';
import { IUser } from '../../../pages/Profile';
import Block from '../../../utils/Block';
import timeSince from '../../../utils/timeSince';
import { messageTemplate } from './message.tmpl';

Handlebars.registerHelper('if_equal', (val1: any, val2: any) => val1 === val2);

export interface IMessage {
  id: number;
  user: IUser;
  time: string;
  content_type: string;
  content: string;
}

export default class Message extends Block<IMessage> {
  render() {
    this.element!.classList.add('messages__message');

    if (this.props.user.id === 1) {
      this.element!.classList.add('messages__message--out');
    } else {
      this.element!.classList.add('messages__message--in');
    }

    if (this.props.content_type === 'image') {
      this.element!.classList.add('messages__message--image');
    }

    const time = timeSince(this.props.time);

    return this.compile(Handlebars.compile(messageTemplate), {
      ...this.props,
      time,
    });
  }
}
