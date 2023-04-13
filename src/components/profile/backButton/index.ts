import Handlebars from 'handlebars';
import './backButton.scss';
import Block from '../../../utils/Block';
import Router from '../../../utils/Router';

const router = new Router();

// interface IBackButton {
//   link: string;
// }
export default class BackButton extends Block {
  constructor() {
    super({}, 'button');
  }

  init() {
    this.props.events = {
      click: (event: Event) => {
        event.preventDefault();
        router.back();
      },
    };
  }

  render() {
    this.element!.classList.add('profile_back-button');
    this.element!.textContent = '🔙';
    return this.compile(Handlebars.compile(''), this.props);
  }
}
