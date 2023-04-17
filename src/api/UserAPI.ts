import BaseAPI from './baseAPI';

export interface IChangeProfile {
  [key: string]: string;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
}

export interface IChangeAvatar {
  file: FormData;
}

export interface IChangePassword {
  [key: string]: string;
  oldPassword: string;
  newPassword: string;
}

export default class UserAPI extends BaseAPI {
  constructor() {
    super('/user');
  }

  changeProfile(data: IChangeProfile) {
    return this.http.put('/profile', { data });
  }

  changeAvatar(data: FormData) {
    return this.http.put('/profile/avatar', {
      data,
      headers: null,
      stringify: false,
    });
  }

  changePassword(data: IChangePassword) {
    return this.http.put('/password', { data });
  }

  getUserByLogin(data: { login: string }) {
    return this.http.post('/search', { data });
  }
}
