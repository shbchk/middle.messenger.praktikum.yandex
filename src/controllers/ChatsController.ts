import ChatsAPI from '../api/ChatsAPI';
import store from '../utils/Store';
import { escapeObjectValues } from '../utils/escape';

class ChatsController {
  private api: ChatsAPI;

  constructor() {
    this.api = new ChatsAPI();
  }

  async getChats() {
    await this.api
      .getChats({})
      .then((data) => {
        store.set('chats.data', data);
        console.log(data);
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
        this.getChats();
      })
      .catch((err) => {
        console.log('createChat err', err);
      });
  }

  async fetchChatToken(chatId: number) {
    await this.api.getChatToken(chatId).then((response) => {
      store.set('chat.currentChatToken', (response as { token: string }).token);
      store.set('chat.currentChatId', chatId);
      console.log(response);
    });
  }

  async fetchChatUsers(chatId: number) {
    await this.api.getChatUsers(chatId).then((response) => {
      store.set('chat.users', response);
      console.log(response);
    });
  }

  async addUsers(data: { users: number[]; chatId: number }) {
    await this.api
      .addUsers(data)
      .then(() => {
        this.fetchChatUsers(data.chatId);
      })
      .catch(console.log);
  }

  async deleteUsers(data: { users: number[]; chatId: number }) {
    await this.api
      .addUsers(data)
      .then(() => {
        this.fetchChatUsers(data.chatId);
      })
      .catch(console.log);
  }
}

export default new ChatsController();
