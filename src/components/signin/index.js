import Handlebars from 'handlebars';
import signin from 'bundle-text:./signin.hbs';
import ('./signin.less')

const { ModalButton } = require('../modalButton');
const { InputGroup } = require('../inputGroup');

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

const button = ModalButton({ text: 'Войти', type: 'submit'})


export const Signin = () => Handlebars.compile(signin)({ inputgroups, button });
