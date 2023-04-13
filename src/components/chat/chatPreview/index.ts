import Handlebars from 'handlebars';

import Block from '../../../utils/Block';
import timeSince from '../../../utils/timeSince';
import { chatPreviewTemplate } from './chatPreview.tmpl';
import { AVATARSTUB } from '../../../AVATARSTUB';

export interface IChat {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: {
    user: {
      first_name: string;
      second_name: string;
      avatar: string;
      email: string;
      login: string;
      phone: string;
    };
    time: string;
    content: string;
  };
}

interface IChatPreview extends IChat {
  // eslint-disable-next-line no-unused-vars
  events?: Record<string, (event: Event) => void>;
}

export default class ChatPreview extends Block<IChatPreview> {
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
      display_name: `${this.props.last_message.user.first_name} ${this.props.last_message.user.second_name}`,
      avatar: this.props.avatar ? AVATARSTUB : this.props.avatar,
      content: this.props.last_message.content,
      time,
      unread_count: this.props.unread_count > 0 ? this.props.unread_count : '',
    });
  }
}
