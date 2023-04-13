/* eslint-disable max-classes-per-file */
import { IUser } from '../api/AuthAPI';
import { IChat } from '../components/chat/chatPreview';
import Block from './Block';
import EventBus from './EventBus';
import set from './set';

// eslint-disable-next-line no-shadow
export enum StoreEvents {
  // eslint-disable-next-line no-unused-vars
  Updated = 'Updated',
}

interface IState {
  user?: {
    data?: IUser;
    isLoading?: boolean;
    hasError?: boolean;
  };
  messages?: any[];
  chats?: IChat[];
}

class Store extends EventBus {
  private _state: IState = {};

  public getState() {
    return this._state;
  }

  public set(path: string, value: unknown) {
    set(this._state, path, value);

    console.log('дернулся store.set, записал в стор вот что:', this.getState());

    this.emit(StoreEvents.Updated, this._state);
  }
}

const store = new Store();

// eslint-disable-next-line no-unused-vars
export const withStore = <T>(mapStateToProps: (state: IState) => any) => {
  return (Component: typeof Block) => {
    return class extends Component {
      constructor(props: T) {
        const mappedState = mapStateToProps(store.getState());
        super({ ...props, ...mappedState });

        console.log('withStore called');

        store.on(StoreEvents.Updated, (newState) => {
          const newMappedState = mapStateToProps(newState);

          console.log('newMappedState from withStore store.on', newMappedState);

          this.setProps(newMappedState);
        });
      }
    };
  };
};

export default store;
