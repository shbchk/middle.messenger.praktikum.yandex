import BaseAPI from './baseAPI';

export default class ChatsAPI extends BaseAPI {
  constructor() {
    super('');
  }

  getChats() {
    return this.http.get('/chats');
  }

  createChat(data: { title: string }) {
    return this.http.post('/chats', { data });
  }

  deleteChat(data: { chatId: number }) {
    return this.http.delete('/chats', { data });
  }

  uploadAvatar(data: FormData) {
    return this.http.put('/chats/avatar', { data });
  }

  addUsers(data: { users: number[]; chatId: number }) {
    return this.http.put('/chats/users', { data });
  }

  deleteUsers(data: { users: number[]; chatId: number }) {
    return this.http.delete('/chats/users', { data });
  }

  getChatToken(chatId: number) {
    return this.http.post(`/chats/token/${chatId}`);
  }

  getChatUsers(chatId: number) {
    return this.http.get(`/chats/${chatId}/users`);
  }
}
