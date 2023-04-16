import Handlebars from 'handlebars';
import { inputgroupTemplate } from './inputgroup.tmpl';
import './inputgroup.scss';
import Block from '../../utils/Block';

interface IInputGroup {
  inputId: string;
  inputLabel: string;
  errorMessage: string;
  input: Block;
}

export default class inputGroup extends Block<IInputGroup> {
  render() {
    this.element?.classList.add('modal__inputgroup');
    return this.compile(Handlebars.compile(inputgroupTemplate), this.props);
  }
}
