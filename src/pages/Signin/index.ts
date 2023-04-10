import Handlebars from 'handlebars';
import { signinTemplate } from './signin.tmpl';
import InputGroup from '../../components/inputGroup';
import ModalButton from '../../components/modalButton';
import './signin.scss';
import Block from '../../utils/Block';
import Input from '../../components/input';
import { validateField } from '../../utils/validateField';
import Link from '../../components/link/link';
import Router from '../../utils/Router';
import { ROUTES } from '../../ROUTES';
import { withStore } from '../../utils/Store';

const router = new Router();

interface ISignin {
  // eslint-disable-next-line no-unused-vars
  events: Record<string, (event: Event) => void>;
}

class SigninBase extends Block<ISignin> {
  constructor(props: ISignin) {
    super(props, 'form');
  }

  init() {
    document.title = 'Авторизация';

    this.children.inputgroups = [
      new InputGroup({
        inputLabel: 'Логин',
        errorMessage:
          'Требования к логину: от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)',
        input: new Input({
          inputClassList: ['modal__input'],
          inputId: 'login',
          inputName: 'login',
          inputType: 'text',
          inputRequired: 'required',
          events: {
            focus: (event: Event) => validateField(event, 'signin-form'),
            blur: (event: Event) => validateField(event, 'signin-form'),
            input: (event: Event) => validateField(event, 'signin-form'),
          },
        }),
        inputId: 'login',
      }),
      new InputGroup({
        inputLabel: 'Пароль',
        errorMessage:
          'Требования к паролю: от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
        input: new Input({
          inputClassList: ['modal__input'],
          inputId: 'password',
          inputName: 'password',
          inputType: 'password',
          inputRequired: 'required',
          events: {
            focus: (event) => validateField(event, 'signin-form'),
            blur: (event) => validateField(event, 'signin-form'),
            input: (event) => validateField(event, 'signin-form'),
          },
        }),
        inputId: 'password',
      }),
    ];

    this.children.button = new ModalButton({
      text: 'Войти',
      type: 'submit',
      link: '/chat.html',
      disabled: true,
      id: 'submit-button',
      // events: {
      //   click: (event) => {
      //     event.preventDefault();
      //     console.log('jgjjg');
      //   },
      // },
    });

    this.children.link = new Link({
      href: '/sign-up',
      text: 'Ещё не зарегистрированы?',
      classList: ['signin__authlink'],
      events: {
        click: (event) => {
          event.preventDefault();
          router.go(ROUTES.signup);
        },
      },
    });
  }

  render() {
    this.element!.id = 'signin-form';
    return this.compile(Handlebars.compile(signinTemplate), {
      ...this.props,
      inputgroups: Array.isArray(this.children.inputgroups)
        ? this.children.inputgroups.map((inputgroup) => inputgroup.getContent())
        : this.children.inputgroups.getContent(),
    });
  }
}

const withUser = withStore((state) => ({ ...state.user }));

const Signin = withUser(SigninBase as typeof Block);

export default Signin;
