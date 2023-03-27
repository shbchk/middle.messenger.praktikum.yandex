import Handlebars from 'handlebars';
import { profileRowTemplate } from './profileRow.tmpl';
import './profileRow.less';
import Block from '../../../utils/Block';

interface IProfileRow {
  rowLabel: string;
  rowInput: Block;
}

export default class ProfileRow extends Block<IProfileRow> {
  constructor(props: IProfileRow) {
    super('div', props);
  }

  render() {
    this.element!.classList.add('profile__row');

    return this.compile(Handlebars.compile(profileRowTemplate), this.props);
  }
}
