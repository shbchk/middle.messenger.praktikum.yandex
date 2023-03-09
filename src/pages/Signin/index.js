import Handlebars from 'handlebars';
import { signinTemplate } from './signin.tmpl';
import { InputGroup } from '../../components/inputGroup';
import { ModalButton } from '../../components/modalButton';
import('./signin.less');

const inputgroups = [
  InputGroup({
    inputType: 'text',
    inputName: 'login',
    inputId: 'login',
    inputRequired: 'required',
    inputLabel: 'Логин',
    errorMessage: 'Логин должен быть длиннее трех символов',
  }),
  InputGroup({
    inputType: 'password',
    inputName: 'password',
    inputId: 'password',
    inputRequired: 'required',
    inputLabel: 'Пароль',
    errorMessage: 'Кажется, вы ввели неверный пароль 😱',
  }),
];

const button = ModalButton({ text: 'Войти', type: 'submit', link: '/chat.html' });

export const Signin = () => {
  document.title = 'Авторизация';
  return Handlebars.compile(signinTemplate)({ inputgroups, button });
};
