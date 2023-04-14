/* eslint-disable max-classes-per-file */
import { IUser } from '../api/AuthAPI';
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
    hasError?: boolean;
    errorReason?: string | null;
  };
  messages?: {
    data: any[];
  };
  chats?: {
    data: any;
  };
}

class Store extends EventBus {
  private _state: IState = {
    chats: {
      data: [],
    },
  };

  public getState() {
    return this._state;
  }

  public set(path: string, value: unknown) {
    set(this._state, path, value);

    this.emit(StoreEvents.Updated, this.getState());
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

        store.on(StoreEvents.Updated, (newState) => {
          const newMappedState = mapStateToProps(newState);

          this.setProps(newMappedState);
        });
      }
    } as typeof Block;
  };
};

export default store;
