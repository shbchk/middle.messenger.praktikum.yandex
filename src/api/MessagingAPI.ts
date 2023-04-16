// eslint-disable-next-line import/no-cycle
import { IMsg } from '../typings/interfaces';
import store from '../utils/Store';
import { escapeObjectValues } from '../utils/escape';

interface IChatsWS {
  userId: number;
  chatId: number;
  token: string;
}

interface ISendData {
  [key: string]: string | undefined;
  content?: string;
  type: string;
}

class MessagingAPI {
  private ws?: WebSocket;

  private props?: IChatsWS;

  private connecting: boolean = false;

  private timerId: ReturnType<typeof setInterval> | null = null;

  public connect(props: IChatsWS) {
    return new Promise((resolve, reject) => {
      const { userId, chatId, token } = props;
      if (this.connecting) {
        return;
      }

      if (
        this.ws &&
        this.props?.chatId !== chatId &&
        this.props?.token !== token
      ) {
        this.close();
        this.ws = undefined;
      }

      this.props = props;

      this.connecting = true;

      this.ws = new WebSocket(
        `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`,
      );

      this.ws.onopen = (event) => {
        this.connecting = false;
        console.log('Соединение установлено', event);
        resolve(event);
      };

      this.ws.onclose = (event) => {
        if (event.wasClean) {
          console.log('Соединение закрыто чисто');
        } else {
          console.log('Обрыв соединения');
        }

        console.log(`Код: ${event.code} | Причина: ${event.reason}`);

        this.connecting = false;
      };

      this.ws.onmessage = (event) => {
        const msgs = store.getState().chat.messages;
        const received = JSON.parse(event.data) as IMsg;
        if (received.type === 'message') {
          store.set('chat.messages', [received, ...msgs]);
        }
        if (Array.isArray(received)) {
          store.set('chat.messages', [...received]);
        }
      };

      this.ws.onerror = (event) => {
        reject(event);
      };

      this.timerId = setInterval(() => {
        this.ping();
      }, 5000);
    });
  }

  public send(data: ISendData) {
    this.ws?.send(JSON.stringify(escapeObjectValues<ISendData>(data)));
  }

  public fetchOldMessages(offset: number = 0) {
    this.send({ type: 'get old', content: `${offset}` });
  }

  private ping() {
    this.send({
      type: 'ping',
    });
  }

  public close() {
    this.ws?.close();
    clearInterval(this.timerId as ReturnType<typeof setInterval>);
    this.timerId = null;
  }
}

export default MessagingAPI;
