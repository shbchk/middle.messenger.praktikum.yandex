import 'normalize.css';
import Chat from './pages/Chat';
import ErrorPage from './pages/ErrorPage';
import PasswordChange from './pages/PasswordChange';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import { validateField } from './utils/validateField';
import './styles/_common.scss';
import Block from './utils/Block';
import Router from './utils/Router';
import { ROUTES } from './ROUTES';
import authController from './controllers/AuthController';

const router = new Router();

window.addEventListener('DOMContentLoaded', async () => {
  router
    .use(ROUTES.index, Signin as typeof Block)
    .use(ROUTES.signin, Signin as typeof Block)
    .use(ROUTES.signup, Signup as typeof Block)
    .use(ROUTES.profile, Profile as typeof Block)
    .use(ROUTES.profileEdit, ProfileEdit as typeof Block, {
      events: {
        submit: (event: Event) => {
          event.preventDefault();
          validateField(event, 'profileEdit');
        },
      },
    })
    .use(ROUTES.password, PasswordChange as typeof Block, {
      events: {
        submit: (event: Event) => {
          event.preventDefault();
          validateField(event, 'profileEdit');
        },
      },
    })
    .use(ROUTES.chat, Chat as typeof Block)
    .use(ROUTES.err404, ErrorPage as typeof Block, {
      errorCode: '😱',
      errorMessage: 'Ой!',
    })
    .use(ROUTES.err, ErrorPage as typeof Block, {
      errorCode: '😱',
      errorMessage: 'Ой!',
    });

  await authController.fetchUser();

  router.start();
});
