import 'normalize.css';
import Modal from './components/modal';
import Signin from './pages/Signin';
import { validateField } from './utils/validateField';

const currentPath = window.location.pathname;
let renderedHTML;

if (currentPath === '/') {
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

type Nullable<T> = T | null;

const root: Nullable<HTMLDivElement> = document.getElementById(
  'root',
) as HTMLDivElement;

if (!root) {
  throw new Error('There is no #root div');
}

root.append(renderedHTML as HTMLElement);
