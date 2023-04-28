/* eslint-disable max-classes-per-file */
import { IState } from '../typings/interfaces';
import Block from './Block';
import EventBus from './EventBus';
import set from './set';

export enum StoreEvents {
  Updated = 'Updated',
}

class Store extends EventBus {
  private _state: IState = {
    chats: {
      data: [],
    },
    chat: {
      messages: [],
      users: [],
    },
    addUsers: {
      found: [],
      usersToAdd: [],
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
