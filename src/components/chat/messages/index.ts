import Handlebars from 'handlebars';
import Block from '../../../utils/Block';
import { IMessage } from '../message';
import { messagesTemplate } from './messages.tmpl';
import { withStore } from '../../../utils/Store';

interface IMessages {
  messagesArray: IMessage[];
  messagesInput: Block;
}

class MessagesBase extends Block<IMessages> {
  render() {
    this.element!.classList.add('messages');
    return this.compile(Handlebars.compile(messagesTemplate), this.props);
  }
}

const withMessages = withStore<IMessages>((state) => ({
  messages: { ...state.messages },
}));

const Chatlist = withMessages(MessagesBase as typeof Block);

export default Chatlist;
