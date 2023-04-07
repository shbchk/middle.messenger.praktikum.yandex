import Handlebars from 'handlebars';
import Block from '../../utils/Block';

interface ILinkProps {
  href: string;
  text: string;
  classList?: string[];
  target?: string;
  title?: string;
  id?: string;
  // eslint-disable-next-line no-unused-vars
  events?: Record<string, (event: Event) => void>;
}

export default class Link extends Block<ILinkProps> {
  constructor(props: ILinkProps) {
    super(props, 'a');
  }

  render() {
    (this.element! as HTMLAnchorElement).href = this.props.href;

    (this.element! as HTMLAnchorElement).textContent = this.props.text;

    if (this.props.id) {
      (this.element! as HTMLAnchorElement).id = this.props.id;
    }

    if (this.props.title) {
      (this.element! as HTMLAnchorElement).title = this.props.title;
    }

    if (this.props.target) {
      (this.element! as HTMLAnchorElement).target = this.props.target;
    }

    if (this.props.classList) {
      this.props.classList.forEach((linkClass) =>
        this.element!.classList.add(linkClass),
      );
    }

    return this.compile(Handlebars.compile(''), this.props);
  }
}
