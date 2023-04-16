import Handlebars from 'handlebars';
import Block from '../../utils/Block';

interface ITextarea {
  name: string;
  rows: number;
  classList: string[];
  placeholder?: string;
  id: string;
  // eslint-disable-next-line no-unused-vars
  events?: Record<string, (event: Event) => void>;
}

export default class Textarea extends Block<ITextarea> {
  constructor(props: ITextarea) {
    super(props, 'textarea');
  }

  render() {
    (this.element! as HTMLTextAreaElement).rows = this.props.rows;
    (this.element! as HTMLTextAreaElement).name = this.props.name;
    (this.element! as HTMLTextAreaElement).id = this.props.id;
    this.props.classList.forEach((textareaClass) =>
      this.element!.classList.add(textareaClass),
    );

    if (this.props.placeholder) {
      (this.element! as HTMLTextAreaElement).placeholder =
        this.props.placeholder;
    }
    return this.compile(Handlebars.compile(''), this.props);
  }
}
