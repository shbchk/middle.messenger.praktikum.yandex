import Handlebars from 'handlebars';
import { inputgroupTemplate } from './inputgroup.tmpl';
import './inputgroup.less';

interface IInputGroup {
  inputType: string;
  inputName: string;
  inputId: string;
  inputRequired: string;
  inputLabel: string;
  errorMessage: string;
}

export const InputGroup = ({ inputType, inputName, inputId, inputRequired, inputLabel, errorMessage }: IInputGroup) =>
  Handlebars.compile(inputgroupTemplate)({ inputType, inputName, inputId, inputRequired, inputLabel, errorMessage });
