import Handlebars from 'handlebars';
import Block from '../../../utils/Block';
import { chatlistTemplate } from './chatlist.tmpl';
import { withStore } from '../../../utils/Store';
import ChatsController from '../../../controllers/ChatsController';
import ChatPreview, { IChat } from '../chatPreview';

interface IChatlist {
  chatSearch: Block | string;
  chats?: {
    data: IChat[];
  };
}

class ChatlistBase extends Block<IChatlist> {
  init() {
    console.log('дернулся init() в ChatlistBase');

    // ВТОРОЙ ВЫЗОВ ChatsController.getChats(), первый был в pages/Chat/index.ts
    ChatsController.getChats();

    console.log('Chatlist.props in init after getChats', this.props);
  }

  render() {
    this.children.chatPreviews = this.props.chats!.data.map(
      (chatPreview: IChat) => new ChatPreview(chatPreview),
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
