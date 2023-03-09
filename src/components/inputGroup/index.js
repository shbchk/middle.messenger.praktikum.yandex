import Handlebars from 'handlebars';
import { inputgroupTemplate } from './inputgroup.tmpl';
import('./inputgroup.less');

export const InputGroup = ({ inputType, inputName, inputId, inputRequired, inputLabel, errorMessage }) =>
  Handlebars.compile(inputgroupTemplate)({ inputType, inputName, inputId, inputRequired, inputLabel, errorMessage });
