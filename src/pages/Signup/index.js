import Handlebars from 'handlebars';
import { signupTemplate } from './signup.tmpl';
import { InputGroup } from '../../components/inputGroup';
import { ModalButton } from '../../components/modalButton';
import('./signup.less');

const inputgroups = [
  InputGroup({
    inputType: 'text',
    inputName: 'email',
    inputId: 'email',
    inputRequired: 'required',
    inputLabel: 'Почта',
    errorMessage: 'Неверный формат почтового адреса',
  }),
  InputGroup({
    inputType: 'text',
    inputName: 'login',
    inputId: 'login',
    inputRequired: 'required',
    inputLabel: 'Логин',
    errorMessage: 'Логин должен быть длиннее трех символов',
  }),
  InputGroup({
    inputType: 'text',
    inputName: 'first_name',
    inputId: 'first_name',
    inputRequired: 'required',
    inputLabel: 'Имя',
    errorMessage: 'Пожалуйста, введите имя',
  }),
  InputGroup({
    inputType: 'text',
    inputName: 'second_name',
    inputId: 'second_name',
    inputRequired: 'required',
    inputLabel: 'Фамилия',
    errorMessage: 'Пожалуйста, введите фамилию',
  }),
  InputGroup({
    inputType: 'text',
    inputName: 'phone',
    inputId: 'phone',
    inputRequired: 'required',
    inputLabel: 'Телефон',
    errorMessage: 'Пожалуйста, введите правильный телефон',
  }),
  InputGroup({
    inputType: 'password',
    inputName: 'password',
    inputId: 'password',
    inputRequired: 'required',
    inputLabel: 'Пароль',
    errorMessage: 'Пароль должен состоять минимум из 5 символов',
  }),
  InputGroup({
    inputType: 'password',
    inputName: 'password_confirm',
    inputId: 'password_confirm',
    inputRequired: 'required',
    inputLabel: 'Пароль (еще раз, на всякий случай)',
    errorMessage: 'Пароли не совпадают :(',
  }),
];

const button = ModalButton({ text: 'Создать аккаунт', type: 'submit', link: '/chat.html' });

export const Signup = () => {
  document.title = 'Регистрация';
  return Handlebars.compile(signupTemplate)({ inputgroups, button });
};
