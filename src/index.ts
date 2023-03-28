import 'normalize.css';
import Modal from './components/modal';
import Chat from './pages/Chat';
import ErrorPage from './pages/ErrorPage';
import PasswordChange from './pages/PasswordChange';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import { validateField } from './utils/validateField';

const currentPath = window.location.pathname;
let renderedHTML;

if (currentPath === '/' || currentPath === '/signin.html') {
  const modal = new Modal({
    modalHeader: 'Авторизация',
    modalContent: new Signin({
      events: {
        submit: (event) => {
          event.preventDefault();
          const isValid = validateField(event, 'signin-form');

          const formData = new FormData(event.target as HTMLFormElement);
          const data: Record<string, string> = {};
          formData.forEach((value, key) => {
            data[key] = value.toString();
          });

          console.log(data);
          console.log(
            'Пароль верный! Переход на /chat.html через 3 секунды...',
          );

          if (isValid) {
            // eslint-disable-next-line no-restricted-globals, no-return-assign
            setTimeout(() => (location.href = '/chat.html'), 3000);
          }
        },
      },
    }),
  });

  renderedHTML = modal.getContent();
}

if (currentPath === '/signup.html') {
  const modal = new Modal({
    modalHeader: 'Регистрация',
    modalContent: new Signup({
      events: {
        submit: (event) => {
          event.preventDefault();
          const isValid = validateField(event, 'signup-form');

          const formData = new FormData(event.target as HTMLFormElement);
          const data: Record<string, string> = {};
          formData.forEach((value, key) => {
            data[key] = value.toString();
          });

          console.log(data);
          console.log(
            'Все поля заполнены верно! Переход на /chat.html через 3 секунды...',
          );

          if (isValid) {
            // eslint-disable-next-line no-restricted-globals, no-return-assign
            setTimeout(() => (location.href = '/chat.html'), 3000);
          }
        },
      },
    }),
  });

  renderedHTML = modal.getContent();
}

if (currentPath === '/404.html') {
  const errorPage = new ErrorPage({
    errorCode: '😱',
    errorMessage: 'Ой!',
  });

  renderedHTML = errorPage.getContent();
}

if (currentPath === '/profile.html') {
  const profile = new Profile({
    avatar: 'https://xsgames.co/randomusers/avatar.php?g=male',
    displayName: 'Васисуалий Лоханкин',
    email: 'vasisualy@lohankin.com',
    firstName: 'Васисуалий',
    secondName: 'Лоханкин',
    login: 'vasisu',
    phone: '+7965986565626',
  });

  renderedHTML = profile.getContent();
}

if (currentPath === '/edit.html') {
  const profile = new ProfileEdit({
    avatar: 'https://xsgames.co/randomusers/avatar.php?g=male',
    displayName: 'Васисуалий Лоханкин',
    email: 'vasisualy@lohankin.com',
    firstName: 'Васисуалий',
    secondName: 'Лоханкин',
    login: 'vasisu',
    phone: '+7965986565626',
    events: {
      submit: (event) => {
        event.preventDefault();
        validateField(event, 'profileEdit');
      },
    },
  });

  renderedHTML = profile.getContent();
}

if (currentPath === '/password.html') {
  const passwordChange = new PasswordChange({
    avatar: 'https://xsgames.co/randomusers/avatar.php?g=male',
    displayName: 'Васисуалий Лоханкин',
    email: 'vasisualy@lohankin.com',
    firstName: 'Васисуалий',
    secondName: 'Лоханкин',
    login: 'vasisu',
    phone: '+7965986565626',
    events: {
      submit: (event) => {
        event.preventDefault();
        validateField(event, 'profileEdit');
      },
    },
  });

  renderedHTML = passwordChange.getContent();
}

if (currentPath === '/chat.html') {
  const chat = new Chat({});

  renderedHTML = chat.getContent();
}

type Nullable<T> = T | null;

const root: Nullable<HTMLDivElement> = document.getElementById(
  'root',
) as HTMLDivElement;

if (!root) {
  throw new Error('There is no #root div');
}

root.append(renderedHTML as HTMLElement);
