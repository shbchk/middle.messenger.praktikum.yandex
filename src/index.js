const Handlebars = require('handlebars');
import('normalize.css');

const currentPath = window.location.pathname;
let renderedTemplate;

/* ERROR PAGE */
if (currentPath === '/404.html') {
  const { Error } = require('./components/error');
  renderedTemplate = Error({ errorCode: '😱', errorMessage: 'Ой!' });
}

/* SIGN IN PAGE */
if (currentPath === '/signin.html' || currentPath === '/') {
  const { Modal } = require('./components/modal');
  const { Signin } = require('./components/signin');
  renderedTemplate = Modal({ modalHeader: 'Войти', modalContent: Signin() });
}

/* SIGN UP PAGE */
if (currentPath === '/signup.html') {
  const { Modal } = require('./components/modal');
  const { Signup } = require('./components/signup');
  renderedTemplate = Modal({ modalHeader: 'Зарегистрироваться', modalContent: Signup() });
}

/* PROFILE PAGE */
if (currentPath === '/profile.html') {
  const { Profile } = require('./components/profile');
  renderedTemplate = Profile();
}

/* PROFILE EDIT PAGE */
if (currentPath === '/edit.html') {
  const { ProfileEdit } = require('./components/profile/profileEdit');
  renderedTemplate = ProfileEdit();
}

const root = document.getElementById('root');
root.innerHTML = renderedTemplate;
