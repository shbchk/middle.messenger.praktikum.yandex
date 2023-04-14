import { ROUTES } from '../ROUTES';
import UserAPI, { IChangePassword, IChangeProfile } from '../api/UserAPI';
import Router from '../utils/Router';
import store from '../utils/Store';
import { escapeObjectValues } from '../utils/escape';

const router = new Router();

class UserController {
  private api: UserAPI;

  constructor() {
    this.api = new UserAPI();
  }

  changeProfile(data: IChangeProfile) {
    this.api
      .changeProfile(escapeObjectValues<IChangeProfile>(data))
      .then((response) => {
        store.set('user.data', response);
        router.go(ROUTES.profile);
      })
      .catch((err) => {
        console.log('changeProfile error', err);
      });
  }

  changePassword(data: IChangePassword) {
    store.set('user.hasError', false);
    store.set('user.errorReason', '');

    this.api
      .changePassword(escapeObjectValues<IChangePassword>(data))
      .then((response) => {
        store.set('user.hasError', false);
        store.set('user.errorReason', null);
        router.go(ROUTES.profile);
      })
      .catch((err) => {
        store.set('user.hasError', true);
        store.set('user.errorReason', err.reason);
        console.log('IChangePassword error', err);
      });
  }
}

export default new UserController();
