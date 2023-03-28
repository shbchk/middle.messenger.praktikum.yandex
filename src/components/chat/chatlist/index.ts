import Handlebars from 'handlebars';
import Block from '../../../utils/Block';
import { chatlistTemplate } from './chatlist.tmpl';

interface IChatlist {
  chatSearch: Block;
  chatPreviews: Block[];
  avatar: string;
  displayName: string;
}

export default class Chatlist extends Block<IChatlist> {
  render() {
    this.element!.classList.add('chatlist');
    return this.compile(Handlebars.compile(chatlistTemplate), this.props);
  }
}
