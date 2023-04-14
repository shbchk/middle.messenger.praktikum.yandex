import { ROUTES } from '../ROUTES';
import UserAPI, { IChangeProfile } from '../api/UserAPI';
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
        console.log('changeProfile response', response);
        store.set('user.data', response);
        router.go(ROUTES.profile);
      })
      .catch((err) => {
        console.log('changeProfile error', err);
      });
  }
}

export default new UserController();
