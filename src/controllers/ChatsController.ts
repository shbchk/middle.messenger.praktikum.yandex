import ChatsAPI from '../api/ChatsAPI';
import store from '../utils/Store';
import { escapeObjectValues } from '../utils/escape';

class AuthController {
  private api: ChatsAPI;

  constructor() {
    this.api = new ChatsAPI();
  }

  getChats() {
    this.api
      .getChats({})
      .then((data) => {
        console.log('getChats received data after API call', data);
        store.set('chats.data', data);
      })
      .catch((err) => {
        console.log('getChats err', err);
      });
  }

  async createChat(data: { title: string }) {
    await this.api
      .createChat(escapeObjectValues<{ title: string }>(data))
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log('createChat err', err);
      });
  }
}

export default new AuthController();
