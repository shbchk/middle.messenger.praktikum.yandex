import Handlebars from 'handlebars';
import { signinTemplate } from './signin.tmpl';
import InputGroup from '../../components/inputGroup';
import ModalButton from '../../components/modalButton';
import './signin.less';
import Block from '../../utils/Block';
import Input from '../../components/input';
import { validateField } from '../../utils/validateField';

interface ISignin {
  // eslint-disable-next-line no-unused-vars
  events: Record<string, (event: Event) => void>;
}

export default class Signin extends Block {
  constructor(props: ISignin) {
    super('form', props);
  }

  init() {
    document.title = 'Авторизация';

    this.children.inputgroups = [
      new InputGroup({
        inputLabel: 'Логин',
        errorMessage: 'Логин должен быть длиннее трех символов',
        input: new Input({
          inputClassList: ['modal__input'],
          inputId: 'login',
          inputName: 'login',
          inputType: 'text',
          inputRequired: 'required',
          events: {
            focus: (event: Event) => validateField(event),
            blur: (event: Event) => validateField(event),
          },
        }),
        inputId: 'login',
      }),
      new InputGroup({
        inputLabel: 'Пароль',
        errorMessage: 'Кажется, вы ввели неверный пароль 😱',
        input: new Input({
          inputClassList: ['modal__input'],
          inputId: 'password',
          inputName: 'password',
          inputType: 'password',
          inputRequired: 'required',
          events: {
            focus: (event) => validateField(event),
            blur: (event) => validateField(event),
          },
        }),
        inputId: 'password',
      }),
    ];

    this.children.button = new ModalButton({
      text: 'Войти',
      type: 'submit',
      link: '/chat.html',
    });
  }

  render() {
    return this.compile(Handlebars.compile(signinTemplate), {
      ...this.props,
      inputgroups: Array.isArray(this.children.inputgroups)
        ? this.children.inputgroups.map((inputgroup) => inputgroup.getContent())
        : this.children.inputgroups.getContent(),
    });
  }
}
