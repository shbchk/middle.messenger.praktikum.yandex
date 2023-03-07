const Handlebars = require('handlebars');
import ('normalize.css')

const { Modal } = require('./components/modal');
const { Signin } = require('./components/signin');

const root = document.getElementById('root');

document.title = "Авторизация"

const renderedTemplate = Modal({ header: 'Войти', modalContent: Signin() });

root.innerHTML = renderedTemplate;