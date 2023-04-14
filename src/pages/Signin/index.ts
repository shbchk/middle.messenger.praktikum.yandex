import Handlebars from 'handlebars';
import { signinTemplate } from './signin.tmpl';
import InputGroup from '../../components/inputGroup';
import './signin.scss';
import '../../components/modal/modal.scss';
import Block from '../../utils/Block';
import Input from '../../components/input';
import { validateField } from '../../utils/validateField';
import Link from '../../components/link';
import Router from '../../utils/Router';
import { ROUTES } from '../../ROUTES';
import authController from '../../controllers/AuthController';
import AuthForm from '../../components/authForm';
import Button from '../../components/button';

const router = new Router();

class Signin extends Block {
  init() {
    authController.checkAuth().then(async (loggedIn) => {
      if (loggedIn) {
        await authController.fetchUser();
        router.go(ROUTES.chat);
      }
    });

    this.props.header = 'Авторизация';

    this.children.authForm = new AuthForm({
      formID: 'signin-form',
      inputgroups: [
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
      ],
      button: new Button({
        text: 'Войти',
        type: 'submit',
        disabled: true,
        id: 'submit-button',
        classList: ['modal__button'],
      }),
      link: new Link({
        href: '/sign-up',
        text: 'Ещё не зарегистрированы?',
        classList: ['signin__authlink'],
        events: {
          click: (event) => {
            event.preventDefault();
            router.go(ROUTES.signup);
          },
        },
      }),
      events: {
        submit: (event: Event) => {
          event.preventDefault();
          const isValid = validateField(event, 'signin-form');

          const formData = new FormData(event.target as HTMLFormElement);

          const data = {
            login: '',
            password: '',
          };

          formData.forEach((value, key) => {
            if (key === 'login' || key === 'password') {
              data[key] = value.toString();
            }
          });

          if (isValid) {
            authController.signin(data);
          }
        },
      },
    });
  }

  render() {
    document.title = 'Авторизация';

    this.element!.classList.add('modal__backdrop');

    return this.compile(Handlebars.compile(signinTemplate), this.props);
  }
}

export default Signin;
