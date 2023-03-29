import Handlebars from 'handlebars';
import { errorPageTemplate } from './errorPage.tmpl';
import './errorPage.scss';
import Block from '../../utils/Block';

interface IErrorPage {
  errorCode: string;
  errorMessage: string;
}

export default class ErrorPage extends Block<IErrorPage> {
  render() {
    document.title = `${this.props.errorCode}: ${this.props.errorMessage}`;
    return this.compile(Handlebars.compile(errorPageTemplate), this.props);
  }
}
