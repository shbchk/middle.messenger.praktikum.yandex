import ChatsAPI from '../api/ChatsAPI';
import { IChat } from '../typings/interfaces';
import store from '../utils/Store';
import { escapeObjectValues } from '../utils/escape';

interface IChatPreview extends IChat {
  events?: Record<string, (event: Event) => void>;
}

class ChatsController {
  private api: ChatsAPI;

  constructor() {
    this.api = new ChatsAPI();
  }

  async getChats() {
    await this.api
      .getChats()
      .then((data) => {
        store.set('chats.data', data);
      })
      .catch((err) => {
        console.log('getChats err', err);
      });
  }

  async createChat(data: { title: string }) {
    await this.api
      .createChat(escapeObjectValues<{ title: string }>(data))
      .then(() => {
        this.getChats();
      })
      .catch((err) => {
        console.log('createChat err', err);
      });
  }

  async fetchChatToken(props: IChatPreview) {
    await this.api.getChatToken(props.id).then((response) => {
      store.set('chat.currentChatToken', (response as { token: string }).token);
      store.set('chat.currentChatId', props.id);
      store.set('chat.currentChatCreatedBy', props.created_by);
    });
  }

  async fetchChatUsers(chatId: number) {
    await this.api.getChatUsers(chatId).then((response) => {
      store.set('chat.users', response);
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
      .deleteUsers(data)
      .then(() => {
        this.fetchChatUsers(data.chatId);
      })
      .catch(console.log);
  }

  async deleteChat(data: { chatId: number }) {
    await this.api.deleteChat(data).then(async () => {
      await this.getChats();
    });
  }
}

export default new ChatsController();
