const Handlebars = require('handlebars');
import ('normalize.css')

/* SIGN IN PAGE */
// const { Modal } = require('./components/modal');
// const { Signin } = require('./components/signin');

// const renderedTemplate = Modal({ modalHeader: 'Войти', modalContent: Signin() });


/* ERROR PAGE */
// const { Error } = require('./components/error');

// const renderedTemplate = Error({ errorCode: '😱', errorMessage: 'Ой!' });





const root = document.getElementById('root');
root.innerHTML = renderedTemplate;