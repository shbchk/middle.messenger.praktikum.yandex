const Handlebars = require('handlebars');
import('normalize.css');

/* ERROR PAGE */
// const { Error } = require('./components/error');
// const renderedTemplate = Error({ errorCode: '😱', errorMessage: 'Ой!' });

/* SIGN IN PAGE */
// const { Modal } = require('./components/modal');
// const { Signin } = require('./components/signin');
// const renderedTemplate = Modal({ modalHeader: 'Войти', modalContent: Signin() });

/* SIGN UP PAGE */
// const { Modal } = require('./components/modal');
// const { Signup } = require('./components/signup');
// const renderedTemplate = Modal({ modalHeader: 'Зарегистрироваться', modalContent: Signup() });

/* PROFILE PAGE */
// const { Profile } = require('./components/profile');
// const renderedTemplate = Profile();

/* PROFILE EDIT PAGE */
const { ProfileEdit } = require('./components/profile/profileEdit');
const renderedTemplate = ProfileEdit();

const root = document.getElementById('root');
root.innerHTML = renderedTemplate;
