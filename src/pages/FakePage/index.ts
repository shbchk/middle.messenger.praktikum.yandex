import Handlebars from 'handlebars';
import { fakePageTemplate } from './fakepage.tmpl';
import Block from '../../utils/Block';
import Button from '../../components/button';

export class FakePage extends Block {
  constructor() {
    super('div', {});
  }

  init() {
    this.children.button = new Button({
      label: 'I am button',
      events: {
        click: (event: Event) => console.log(event),
      },
    });
  }

  render() {
    return this.compile(Handlebars.compile(fakePageTemplate), {
      ...this.props,
      pageTitle: 'Fakepage!',
    });
  }
}
