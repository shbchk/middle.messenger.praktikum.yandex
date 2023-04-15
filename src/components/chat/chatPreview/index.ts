import Handlebars from 'handlebars';
import { IChat } from '../../../typings/interfaces';
import Block from '../../../utils/Block';
import timeSince from '../../../utils/timeSince';
import { chatPreviewTemplate } from './chatPreview.tmpl';
import { AVATARSTUB } from '../../../AVATARSTUB';
import ChatsController from '../../../controllers/ChatsController';
import store from '../../../utils/Store';
import MessagingAPI from '../../../api/MessagingAPI';

interface IChatPreview extends IChat {
  // eslint-disable-next-line no-unused-vars
  events?: Record<string, (event: Event) => void>;
}

export default class ChatPreview extends Block<IChatPreview> {
  init() {
    this.props.events = {
      click: () => {
        ChatsController.fetchChatToken(this.props.id)
          .then(async () => {
            await ChatsController.fetchChatUsers(this.props.id);
          })
          .then(async () => {
            store.set('chat.api', new MessagingAPI());

            await store
              .getState()
              .chat.api.connect({
                chatId: this.props.id,
                token: store.getState().chat.currentChatToken as string,
                userId: store.getState().user?.data?.id as number,
              })
              .then(() => {
                store.getState().chat.api.fetchOldMessages();
              });
          });
      },
    };
  }

  render() {
    this.element!.classList.add('chatlist__chat');

    if (this.props.id === store.getState().chat.currentChatId) {
      this.element!.classList.add('chatlist__chat--active');
    }

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
