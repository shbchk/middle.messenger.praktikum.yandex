import { ISigninData, ISignupData } from '../typings/interfaces';
import BaseAPI from './baseAPI';

export default class AuthAPI extends BaseAPI {
  constructor() {
    super('/auth');
  }

  signup(data: ISignupData) {
    return this.http.post('/signup', { data });
  }

  signin(data: ISigninData) {
    return this.http.post('/signin', { data });
  }

  logout() {
    return this.http.post('/logout');
  }

  getUser() {
    return this.http.get('/user');
  }
}
