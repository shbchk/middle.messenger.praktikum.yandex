import Handlebars from 'handlebars';
import Block from '../../../utils/Block';
import { chatSearchTemplate } from './chatSearch.tmpl';

interface IChatSearch {
  chatSearchInput: Block;
  events: Record<string, (event: Event) => void>;
}

export default class ChatSearch extends Block<IChatSearch> {
  constructor(props: IChatSearch) {
    super(props, 'form');
  }

  init() {
    this.element!.classList.add('chatlist__header-search');
    this.element!.id = 'search';
  }

  render() {
    return this.compile(Handlebars.compile(chatSearchTemplate), this.props);
  }
}
