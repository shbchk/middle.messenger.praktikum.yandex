import BaseAPI from './baseAPI';

export interface ISignupData {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export interface ISigninData {
  login: string;
  password: string;
}

export interface IUser {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
}

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

  create = undefined;

  read = undefined;

  update = undefined;

  delete = undefined;
}
