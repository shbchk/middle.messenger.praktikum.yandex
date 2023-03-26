import Handlebars from 'handlebars';
import { inputgroupTemplate } from './inputgroup.tmpl';
import './inputgroup.less';
import Block from '../../utils/Block';

interface IInputGroup {
  inputId: string;
  inputLabel: string;
  errorMessage: string;
  input: Block;
}

export default class inputGroup extends Block<IInputGroup> {
  constructor(props: IInputGroup) {
    super('div', props);
  }

  render() {
    this.element?.classList.add('modal__inputgroup');
    return this.compile(Handlebars.compile(inputgroupTemplate), this.props);
  }
}

// export const InputGroup = ({
//   inputType,
//   inputName,
//   inputId,
//   inputRequired,
//   inputLabel,
//   errorMessage,
// }: IInputGroup) =>
//   Handlebars.compile(inputgroupTemplate)({
//     inputType,
//     inputName,
//     inputId,
//     inputRequired,
//     inputLabel,
//     errorMessage,
//   });
