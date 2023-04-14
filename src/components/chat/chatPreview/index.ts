import Handlebars from 'handlebars';

import Block from '../../../utils/Block';
import timeSince from '../../../utils/timeSince';
import { chatPreviewTemplate } from './chatPreview.tmpl';
import { AVATARSTUB } from '../../../AVATARSTUB';
import ChatsController from '../../../controllers/ChatsController';
import store from '../../../utils/Store';

export interface IChat {
  id: number;
  title: string;
  avatar: string | null;
  unread_count: number;
  created_by: number;
  last_message: {
    user: {
      first_name: string;
      second_name: string;
      avatar: string;
      email: string;
      login: string;
      phone: string;
    } | null;
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

        ChatsController.fetchChatToken(this.props.id).then(async () => {
          await ChatsController.fetchChatUsers(this.props.id);
          console.log(store.getState().messages);
        });
      },
    };
  }

  render() {
    this.element!.classList.add('chatlist__chat');

    const time = this.props.last_message?.time
      ? timeSince(new Date(this.props.last_message.time).getTime())
      : '';

    return this.compile(Handlebars.compile(chatPreviewTemplate), {
      title: this.props?.title,
      avatar: this.props.avatar ? this.props.avatar : AVATARSTUB,
      content: this.props?.last_message?.content
        ? this.props.last_message.content
        : '😶 Нет сообщений',
      time,
      unread_count:
        this.props.unread_count > 0 ? this.props.unread_count : null,
    });
  }
}
