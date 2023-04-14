import Handlebars from 'handlebars';
import Block from '../../../utils/Block';
import { chatlistTemplate } from './chatlist.tmpl';
import { withStore } from '../../../utils/Store';
import ChatPreview, { IChat } from '../chatPreview';
import Link from '../../link';
import { ROUTES } from '../../../ROUTES';
import Router from '../../../utils/Router';

const router = new Router();

interface IChatlist {
  chatSearch: Block | string;
  chats?: {
    data: IChat[];
  };
}

class ChatlistBase extends Block<IChatlist> {
  init() {
    console.log('дернулся init() в ChatlistBase');

    console.log('Chatlist.props in init', this.props);

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
  }

  render() {
    console.log('Chatlist.props in render', this.props);
    console.log('this.props.chats!.data', this.props.chats!.data);

    this.children.chatPreviews = this.props.chats!.data.map(
      (chatPreview: IChat) => {
        console.log('chatPreview', chatPreview);
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
