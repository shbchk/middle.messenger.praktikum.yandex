import AuthAPI from '../api/AuthAPI';
import store from '../utils/Store';
import Router from '../utils/Router';
import { ROUTES } from '../ROUTES';
import { escapeObjectValues } from '../utils/escape';
import { ISigninData, ISignupData, IUser } from '../typings/interfaces';
import ChatsController from './ChatsController';

const router = new Router();

class AuthController {
  private api: AuthAPI;

  constructor() {
    this.api = new AuthAPI();
  }

  signup(data: ISignupData) {
    this.api
      .signup(escapeObjectValues<ISignupData>(data))
      .then(() => {
        router.go('/profile');
      })
      .catch((err) => {
        console.log('signup err', err);
      });
  }

  signin(data: ISigninData) {
    store.set('user.hasError', false);
    store.set('user.errorReason', '');

    this.api
      .signin(escapeObjectValues<ISigninData>(data))
      .then(async () => {
        await this.fetchUser();
        store.set('user.hasError', false);
        store.set('user.errorReason', '');
      })
      .then(async () => {
        await ChatsController.getChats();
        router.go(ROUTES.chat);
      })
      .catch((err) => {
        console.log('signin err', err);
        store.set('user.hasError', true);
        store.set('user.errorReason', err.reason);
      });
  }

  logout() {
    this.api.logout().catch((err) => {
      console.log('logout err', err);
    });

    router.go(ROUTES.index);
  }

  async fetchUser() {
    await this.api
      .getUser()
      .then((user) => {
        store.set('user.data', user);
      })
      .catch((err) => {
        console.log('fetchUser error', err);
      });
  }

  async checkAuth() {
    let isLoggedIn: boolean = false;

    await this.api
      .getUser()
      .then((user) => {
        const { login } = user as IUser;
        isLoggedIn = !!login;
      })
      .catch((err) => {
        console.log('checkAuth error:', err.reason);
      });

    return isLoggedIn;
  }
}

export default new AuthController();
