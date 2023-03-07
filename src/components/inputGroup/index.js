import Handlebars from 'handlebars';

import('./inputgroup.less');
import modal from 'bundle-text:./inputgroup.hbs';

export const InputGroup = ({ inputType, inputName, inputId, inputRequired, inputLabel, errorMessage }) =>
  Handlebars.compile(modal)({ inputType, inputName, inputId, inputRequired, inputLabel, errorMessage });
