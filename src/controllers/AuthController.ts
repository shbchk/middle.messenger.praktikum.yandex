import AuthAPI, { ISigninData, ISignupData, IUser } from '../api/AuthAPI';
import store from '../utils/Store';
import Router from '../utils/Router';
import { ROUTES } from '../ROUTES';

const router = new Router();

class AuthController {
  private api: AuthAPI;

  constructor() {
    this.api = new AuthAPI();
  }

  signup(data: ISignupData) {
    this.api
      .signup(data)
      .then((response) => {
        router.go('/profile');
      })
      .catch((err) => {
        console.log('signup err', err);
      });
  }

  signin(data: ISigninData) {
    this.api
      .signin(data)
      .then(async () => {
        await this.fetchUser();
      })
      .then(() => {
        router.go(ROUTES.chat);
      })
      .catch((err) => {
        console.log('signin err', err);
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
