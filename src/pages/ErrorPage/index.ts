import Handlebars from 'handlebars';
import { errorPageTemplate } from './errorPage.tmpl';
import './errorPage.less';

interface IErrorPage {
  errorCode: string;
  errorMessage: string;
}

export const ErrorPage = ({ errorCode, errorMessage }: IErrorPage) => {
  // eslint-disable-next-line no-undef
  document.title = `${errorCode}: ${errorMessage}`;
  return Handlebars.compile(errorPageTemplate)({ errorCode, errorMessage });
};
