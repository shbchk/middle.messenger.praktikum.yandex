import AuthAPI, { ISigninData, ISignupData, IUser } from '../api/AuthAPI';
import store from '../utils/Store';
import Router from '../utils/Router';

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
      .then((response) => {
        router.go('/profile');
      })
      .catch((err) => {
        console.log('signin err', err);
      });
  }

  logout() {
    this.api.logout().catch((err) => {
      console.log('logout err', err);
    });
  }

  fetchUser() {
    return this.api
      .getUser()
      .then((user) => {
        store.set('user', user);
      })
      .catch((err) => {
        console.log('user is not fetched');
        console.log('fetchUser err', err);
      });
  }
}

export default new AuthController();
