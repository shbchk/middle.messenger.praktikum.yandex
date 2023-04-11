import Handlebars from 'handlebars';
import { signupTemplate } from './signup.tmpl';
import InputGroup from '../../components/inputGroup';
import ModalButton from '../../components/modalButton';
import './signup.scss';
import Block from '../../utils/Block';
import Input from '../../components/input';
import { validateField } from '../../utils/validateField';
import Link from '../../components/link';
import Router from '../../utils/Router';
import { ROUTES } from '../../ROUTES';
import { withStore } from '../../utils/Store';

interface ISignup {
  // eslint-disable-next-line no-unused-vars
  events: Record<string, (event: Event) => void>;
}

const router = new Router();

class SignupBase extends Block<ISignup> {
  constructor(props: ISignup) {
    super(props, 'form');
  }

  init() {
    this.children.inputgroups = [
      new InputGroup({
        inputLabel: 'Почта',
        inputId: 'email',
        errorMessage:
          'Требования к адресу почты: латиница, может включать цифры и спецсимволы вроде дефиса, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы',
        input: new Input({
          inputClassList: ['modal__input'],
          inputId: 'email',
          inputName: 'email',
          inputType: 'text',
          inputRequired: 'required',
          events: {
            focus: (event: Event) => validateField(event, 'signup-form'),
            blur: (event: Event) => validateField(event, 'signup-form'),
            input: (event: Event) => validateField(event, 'signup-form'),
          },
        }),
      }),
      new InputGroup({
        inputLabel: 'Логин',
        inputId: 'login',
        errorMessage:
          'Требования к логину: от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)',
        input: new Input({
          inputClassList: ['modal__input'],
          inputId: 'login',
          inputName: 'login',
          inputType: 'text',
          inputRequired: 'required',
          events: {
            focus: (event: Event) => validateField(event, 'signup-form'),
            blur: (event: Event) => validateField(event, 'signup-form'),
            input: (event: Event) => validateField(event, 'signup-form'),
          },
        }),
      }),
      new InputGroup({
        inputLabel: 'Имя',
        inputId: 'first_name',
        errorMessage:
          'Требования: латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)',
        input: new Input({
          inputClassList: ['modal__input'],
          inputId: 'first_name',
          inputName: 'first_name',
          inputType: 'text',
          inputRequired: 'required',
          events: {
            focus: (event: Event) => validateField(event, 'signup-form'),
            blur: (event: Event) => validateField(event, 'signup-form'),
            input: (event: Event) => validateField(event, 'signup-form'),
          },
        }),
      }),
      new InputGroup({
        inputLabel: 'Фамилия',
        inputId: 'second_name',
        errorMessage:
          'Требования: латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)',
        input: new Input({
          inputClassList: ['modal__input'],
          inputId: 'second_name',
          inputName: 'second_name',
          inputType: 'text',
          inputRequired: 'required',
          events: {
            focus: (event: Event) => validateField(event, 'signup-form'),
            blur: (event: Event) => validateField(event, 'signup-form'),
            input: (event: Event) => validateField(event, 'signup-form'),
          },
        }),
      }),
      new InputGroup({
        inputLabel: 'Телефон',
        inputId: 'phone',
        errorMessage:
          'Требования: от 10 до 15 символов, состоит из цифр, может начинается с плюса',
        input: new Input({
          inputClassList: ['modal__input'],
          inputId: 'phone',
          inputName: 'phone',
          inputType: 'text',
          inputRequired: 'required',
          events: {
            focus: (event: Event) => validateField(event, 'signup-form'),
            blur: (event: Event) => validateField(event, 'signup-form'),
            input: (event: Event) => validateField(event, 'signup-form'),
          },
        }),
      }),
      new InputGroup({
        inputLabel: 'Пароль',
        inputId: 'password',
        errorMessage:
          'Требования: от 7 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
        input: new Input({
          inputClassList: ['modal__input'],
          inputId: 'password',
          inputName: 'password',
          inputType: 'password',
          inputRequired: 'required',
          events: {
            focus: (event: Event) => validateField(event, 'signup-form'),
            blur: (event: Event) => validateField(event, 'signup-form'),
            input: (event: Event) => validateField(event, 'signup-form'),
          },
        }),
      }),
      new InputGroup({
        inputLabel: 'Пароль еще раз',
        inputId: 'password_confirm',
        errorMessage: 'Пароли не совпадают :(',
        input: new Input({
          inputClassList: ['modal__input'],
          inputId: 'password_confirm',
          inputName: 'password_confirm',
          inputType: 'password',
          inputRequired: 'required',
          events: {
            focus: (event: Event) => validateField(event, 'signup-form'),
            blur: (event: Event) => validateField(event, 'signup-form'),
            input: (event: Event) => validateField(event, 'signup-form'),
          },
        }),
      }),
    ];

    this.children.button = new ModalButton({
      text: 'Создать аккаунт',
      type: 'submit',
      link: '/chat.html',
      disabled: true,
      id: 'submit-button',
    });

    this.children.link = new Link({
      href: ROUTES.signin,
      text: 'Уже есть аккаунт?',
      classList: ['signup__authlink'],
      events: {
        click: (event) => {
          event.preventDefault();
          router.go(ROUTES.signin);
        },
      },
    });
  }

  render() {
    this.element!.id = 'signup-form';
    return this.compile(Handlebars.compile(signupTemplate), {
      ...this.props,
      inputgroups: Array.isArray(this.children.inputgroups)
        ? this.children.inputgroups.map((inputgroup) => inputgroup.getContent())
        : this.children.inputgroups.getContent(),
    });
  }
}

const withUser = withStore((state) => ({ ...state.user }));

const Signup = withUser(SignupBase as typeof Block);

export default Signup;
