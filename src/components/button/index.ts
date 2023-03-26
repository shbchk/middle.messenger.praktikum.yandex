import Handlebars from 'handlebars';
import Block from '../../utils/Block';
import { template } from './template';

export default class Button extends Block {
  constructor(props: Record<string, unknown>) {
    super('button', props);
  }

  render() {
    return this.compile(Handlebars.compile(template), this.props);
  }
}
