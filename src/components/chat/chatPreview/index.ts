import Handlebars from 'handlebars';

import Block from '../../../utils/Block';
import timeSince from '../../../utils/timeSince';
import { chatPreviewTemplate } from './chatPreview.tmpl';
import { IUser } from '../../../api/AuthAPI';

export interface ILastMessage {
  user: IUser;
  time: string;
  content: string;
}

export interface IChat {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: ILastMessage;
  // eslint-disable-next-line no-unused-vars
  events?: Record<string, (event: Event) => void>;
}

export default class ChatPreview extends Block<IChat> {
  init() {
    this.props.events = {
      click: () => {
        document
          .querySelector('.chatlist__chat--active')
          ?.classList.remove('chatlist__chat--active');

        document
          .querySelector(`[data-id="${this.id}"]`)
          ?.classList.add('chatlist__chat--active');
      },
    };
  }

  render() {
    this.element!.classList.add('chatlist__chat');

    const time = timeSince(new Date(this.props.last_message.time).getTime());

    return this.compile(Handlebars.compile(chatPreviewTemplate), {
      display_name: this.props.last_message.user.display_name,
      avatar: this.props.avatar,
      content: this.props.last_message.content,
      time,
      unread_count: this.props.unread_count > 0 ? this.props.unread_count : '',
    });
  }
}
