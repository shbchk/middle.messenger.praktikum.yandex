import BaseAPI from './baseAPI';

export default class ChatsAPI extends BaseAPI {
  constructor() {
    super('');
  }

  getChats(data: any) {
    return this.http.get('/chats', { data });
  }

  createChat(data: { title: string }) {
    return this.http.post('/chats', { data });
  }

  deleteChat(data: { chatId: number }) {
    return this.http.delete('/chats', { data });
  }

  uploadAvatar(data: any) {
    return this.http.put('/chats/avatar', { data });
  }

  addUsers(data: { users: number[]; chatId: number }) {
    return this.http.put('/chats/users', { data });
  }

  create = undefined;

  read = undefined;

  update = undefined;

  delete = undefined;
}
