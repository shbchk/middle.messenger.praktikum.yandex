import Handlebars from 'handlebars';
import Block from '../../utils/Block';

interface IInput {
  inputType: string;
  inputName: string;
  inputId: string;
  inputClassList: string[];
  inputRequired?: 'required';
  inputDisabled?: 'disabled';
  inputPlaceholder?: string;
  inputValue?: string;
  // eslint-disable-next-line no-unused-vars
  events?: Record<string, (event: Event) => void>;
}

export default class Input extends Block<IInput> {
  constructor(props: IInput) {
    super('input', props);
  }

  render() {
    (this.element! as HTMLInputElement).type = this.props.inputType;
    (this.element! as HTMLInputElement).name = this.props.inputName;
    (this.element! as HTMLInputElement).id = this.props.inputId;
    this.props.inputClassList.forEach((inputClass) =>
      this.element!.classList.add(inputClass),
    );
    if (this.props.inputRequired) {
      this.element!.setAttribute('required', '');
    }
    if (this.props.inputDisabled) {
      this.element!.setAttribute('disabled', '');
    }
    if (this.props.inputValue) {
      (this.element! as HTMLInputElement).value = this.props.inputValue;
    }
    return this.compile(Handlebars.compile(''), this.props);
  }
}
