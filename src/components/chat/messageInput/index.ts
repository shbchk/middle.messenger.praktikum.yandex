import Handlebars from 'handlebars';
import Block from '../../../utils/Block';
import { messageInputTemplate } from './messageInput.tmpl';

interface IMessageInput {
  textarea: Block;
  events: Record<string, (event: Event) => void>;
}

export default class MessageInput extends Block<IMessageInput> {
  constructor(props: IMessageInput) {
    super(props, 'form');
  }

  init() {
    this.element!.classList.add('messages__input-form');
    this.element!.id = 'message-input-form';
  }

  render() {
    return this.compile(Handlebars.compile(messageInputTemplate), this.props);
  }
}
