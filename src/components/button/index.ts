import Handlebars from 'handlebars';
import Block from '../../utils/Block';
import './button.scss';

interface IButtonProps {
  text: string;
  classList?: string[];
  name?: string;
  type?: string;
  id?: string;
  disabled?: true;
  // eslint-disable-next-line no-unused-vars
  events?: Record<string, (event: Event) => void>;
}

export default class Button extends Block<IButtonProps> {
  constructor(props: IButtonProps) {
    super(props, 'button');
  }

  render() {
    (this.element! as HTMLButtonElement).textContent = this.props.text;

    if (this.props.id) {
      (this.element! as HTMLButtonElement).id = this.props.id;
    }

    if (this.props.name) {
      (this.element! as HTMLButtonElement).name = this.props.name;
    }

    if (this.props.type) {
      (this.element! as HTMLButtonElement).type = this.props.type;
    }

    if (this.props.disabled) {
      (this.element! as HTMLButtonElement).setAttribute('disabled', 'true');
    }

    if (this.props.classList) {
      this.props.classList.forEach((buttonClass) =>
        this.element!.classList.add(buttonClass),
      );
    }

    return this.compile(Handlebars.compile(''), this.props);
  }
}
