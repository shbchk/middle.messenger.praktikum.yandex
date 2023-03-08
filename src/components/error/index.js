import Handlebars from 'handlebars';

import('./error.less');
import error from 'bundle-text:./error.hbs';

export const Error = ({ errorCode, errorMessage }) => {
  document.title = `${errorCode}: ${errorMessage}`
  return Handlebars.compile(error)({ errorCode, errorMessage })
};
