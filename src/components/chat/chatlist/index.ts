import Handlebars from 'handlebars';
import { IUser } from '../../../pages/Profile';
import Block from '../../../utils/Block';
import { chatlistTemplate } from './chatlist.tmpl';

interface IChatlist {
  chatSearch: Block | string;
  chatPreviews: Block[];
  user: IUser;
}

export default class Chatlist extends Block<IChatlist> {
  render() {
    this.element!.classList.add('chatlist');
    return this.compile(Handlebars.compile(chatlistTemplate), this.props);
  }
}
