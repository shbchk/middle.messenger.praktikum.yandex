import Handlebars from 'handlebars';
import Block from '../../../utils/Block';
import { IMessage } from '../message';
import { messagesTemplate } from './messages.tmpl';

interface IMessages {
  messagesArray: IMessage[];
  messagesInput: Block;
}

export default class Messages extends Block<IMessages> {
  render() {
    this.element!.classList.add('messages');
    return this.compile(Handlebars.compile(messagesTemplate), this.props);
  }
}
