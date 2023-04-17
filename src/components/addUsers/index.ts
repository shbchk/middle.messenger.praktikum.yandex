import Handlebars from 'handlebars';
import { addusersTemplate } from './addusers.tmpl';
import './addusers.scss';
import Block from '../../utils/Block';
import store, { withStore } from '../../utils/Store';

import Button from '../button';
import { IState, IUser } from '../../typings/interfaces';

interface IAddUsers {
  inputgroups: Block[];
  searchButton: Block;
  addButton: Block;
  formID: string;
  usersToAdd: string[];
  usersFound: Block[];
  addUsers?: IState['addUsers'];

  events: Record<string, (event: Event) => void>;
}

class AddUsersBase extends Block<IAddUsers> {
  constructor(props: IAddUsers) {
    super(props, 'form');
  }

  render() {
    this.element!.id = this.props.formID;

    this.children.usersFound = this.props.addUsers!.found.map((user) => {
      return new Button({
        text: user.login,
        type: 'button',
        classList: ['addusers__found-user'],
        events: {
          click: (event) => {
            event.preventDefault();

            const esistingUsersToAdd: IUser[] =
              store.getState().addUsers?.usersToAdd &&
              store.getState().addUsers?.usersToAdd.length !== 0
                ? (store.getState().addUsers?.usersToAdd as IUser[])
                : [];

            store.set('addUsers.usersToAdd', [
              ...esistingUsersToAdd,
              store.getState().addUsers?.found.find((u) => u.id === user.id),
            ]);
          },
        },
      });
    });

    return this.compile(Handlebars.compile(addusersTemplate), {
      ...this.props,
      inputgroups: Array.isArray(this.children.inputgroups)
        ? this.children.inputgroups.map((inputgroup) => inputgroup.getContent())
        : this.children.inputgroups.getContent(),
      usersFound: this.children.usersFound.map((user) => user.getContent()),
      usersToAdd: this.props.addUsers?.usersToAdd.map(
        (user) => `<span class="addusers__chosen-user">${user.login}</span>`,
      ),
    });
  }
}

const withUser = withStore((state) => ({
  addUsers: { ...state.addUsers },
}));

const AddUsers = withUser<IAddUsers>(AddUsersBase as typeof Block);

export default AddUsers;
