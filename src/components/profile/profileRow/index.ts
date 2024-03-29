import Handlebars from 'handlebars';
import { profileRowTemplate } from './profileRow.tmpl';
import './profileRow.scss';
import Block from '../../../utils/Block';

interface IProfileRow {
  rowLabel: string;
  rowInput: Block;
  errorMessage?: string;
}

export default class ProfileRow extends Block<IProfileRow> {
  render() {
    this.element!.classList.add('profile__row');

    return this.compile(Handlebars.compile(profileRowTemplate), this.props);
  }
}
