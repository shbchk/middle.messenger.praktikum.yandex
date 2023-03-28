import Handlebars from 'handlebars';
import './backButton.less';
import Block from '../../../utils/Block';

interface IBackButton {
  link: string;
}
export default class BackButton extends Block<IBackButton> {
  constructor(props: IBackButton) {
    super(props, 'a');
  }

  render() {
    this.element!.classList.add('profile_back-button');
    (this.element! as HTMLAnchorElement).href = this.props.link;
    this.element!.textContent = '🔙';
    return this.compile(Handlebars.compile(''), this.props);
  }
}
