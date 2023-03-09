import Handlebars from 'handlebars';
import { errorPageTemplate } from './errorPage.tmpl';
import('./errorPage.less');

export const ErrorPage = ({ errorCode, errorMessage }) => {
  document.title = `${errorCode}: ${errorMessage}`;
  return Handlebars.compile(errorPageTemplate)({ errorCode, errorMessage });
};
