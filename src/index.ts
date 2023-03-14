const Handlebars = require('handlebars');
import { Modal } from './components/modal';
import { Signup } from './pages/Signup';
import { Signin } from './pages/Signin';
import { Chat } from './pages/Chat';
import { ErrorPage } from './pages/ErrorPage';
import { ProfileEdit } from './pages/ProfileEdit';
import { Profile } from './pages/Profile';
import { PasswordChange } from './pages/PasswordChange';

import 'normalize.css';

const currentPath = window.location.pathname;
let renderedTemplate;

/* ERROR PAGE */
if (currentPath === '/404.html') {
  renderedTemplate = ErrorPage({ errorCode: '😱', errorMessage: 'Ой!' });
}

/* SIGN IN PAGE */
if (currentPath === '/signin.html' || currentPath === '/') {
  renderedTemplate = Modal({ modalHeader: 'Войти', modalContent: Signin() });
}

/* SIGN UP PAGE */
if (currentPath === '/signup.html') {
  renderedTemplate = Modal({ modalHeader: 'Зарегистрироваться', modalContent: Signup() });
}

/* PROFILE PAGE */
if (currentPath === '/profile.html') {
  renderedTemplate = Profile();
}

/* PROFILE EDIT PAGE */
if (currentPath === '/edit.html') {
  renderedTemplate = ProfileEdit();
}

/* PASSWORD CHANGE PAGE */
if (currentPath === '/password.html') {
  renderedTemplate = PasswordChange();
}

/* CHAT PAGE */
if (currentPath === '/chat.html') {
  renderedTemplate = Chat();
}

const root = document.getElementById('root')!;
root.innerHTML = renderedTemplate;
