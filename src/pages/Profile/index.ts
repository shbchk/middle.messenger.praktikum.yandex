import Handlebars from 'handlebars';
import { profileTemplate } from './profile.tmpl';
import './profile.scss';
import Block from '../../utils/Block';
import ProfileRow from '../../components/profile/profileRow';
import Input from '../../components/input';
import BackButton from '../../components/profile/backButton';
import { withStore } from '../../utils/Store';
import authController from '../../controllers/AuthController';
import Router from '../../utils/Router';
import { ROUTES } from '../../ROUTES';
import Link from '../../components/link';

const router = new Router();

class ProfileBase extends Block {
  init() {
    authController.checkAuth().then(async (loggedIn) => {
      if (!loggedIn) {
        router.go(ROUTES.index);
      }
    });
  }

  render() {
    this.children.profileRows = [
      new ProfileRow({
        rowLabel: 'Логин',
        rowInput: new Input({
          inputType: 'text',
          inputId: 'login',
          inputName: 'login',
          inputPlaceholder: 'Логин',
          inputRequired: 'required',
          inputDisabled: true,
          inputValue: this.props.user.data.login,
          inputClassList: ['profile__row-value-input'],
        }),
      }),
      new ProfileRow({
        rowLabel: 'Почта',
        rowInput: new Input({
          inputType: 'text',
          inputId: 'email',
          inputName: 'email',
          inputPlaceholder: 'Почта',
          inputRequired: 'required',
          inputDisabled: true,
          inputValue: this.props.user.data.email,
          inputClassList: ['profile__row-value-input'],
        }),
      }),
      new ProfileRow({
        rowLabel: 'Имя',
        rowInput: new Input({
          inputType: 'text',
          inputId: 'first_name',
          inputName: 'first_name',
          inputPlaceholder: 'Имя',
          inputRequired: 'required',
          inputDisabled: true,
          inputValue: this.props.user.data.first_name,
          inputClassList: ['profile__row-value-input'],
        }),
      }),
      new ProfileRow({
        rowLabel: 'Фамилия',
        rowInput: new Input({
          inputType: 'text',
          inputId: 'second_name',
          inputName: 'second_name',
          inputPlaceholder: 'Фамилия',
          inputRequired: 'required',
          inputDisabled: true,
          inputValue: this.props.user.data.second_name,
          inputClassList: ['profile__row-value-input'],
        }),
      }),
      new ProfileRow({
        rowLabel: 'Имя в чате',
        rowInput: new Input({
          inputType: 'text',
          inputId: 'display_name',
          inputName: 'display_name',
          inputPlaceholder: 'Имя в чате',
          inputRequired: 'required',
          inputDisabled: true,
          inputValue: this.props.user.data.display_name
            ? this.props.user.data.display_name
            : `${this.props.user.data.first_name} ${this.props.user.data.second_name}`,
          inputClassList: ['profile__row-value-input'],
        }),
      }),
      new ProfileRow({
        rowLabel: 'Телефон',
        rowInput: new Input({
          inputType: 'text',
          inputId: 'phone',
          inputName: 'phone',
          inputPlaceholder: 'Телефон',
          inputRequired: 'required',
          inputDisabled: true,
          inputValue: this.props.user.data.phone,
          inputClassList: ['profile__row-value-input'],
        }),
      }),
    ];

    this.children.backButton = new BackButton();

    this.children.logoutLink = new Link({
      href: ROUTES.index,
      text: 'Выйти',
      classList: ['profile__edit-button', 'profile__edit-button--logout'],
      events: {
        click: (event) => {
          event.preventDefault();
          authController.logout();
        },
      },
    });

    this.children.settingsLink = new Link({
      href: ROUTES.profileEdit,
      text: 'Изменить данные',
      classList: ['profile__edit-button'],
      events: {
        click: (event) => {
          event.preventDefault();
          router.go(ROUTES.profileEdit);
        },
      },
    });

    this.children.passwordLink = new Link({
      href: ROUTES.password,
      text: 'Изменить пароль',
      classList: ['profile__edit-button'],
      events: {
        click: (event) => {
          event.preventDefault();
          router.go(ROUTES.password);
        },
      },
    });

    return this.compile(Handlebars.compile(profileTemplate), {
      ...this.props,
      profileRows: this.children.profileRows.map((profileRow) =>
        profileRow.getContent(),
      ),
    });
  }
}

const withUser = withStore((state) => ({ user: { ...state.user } }));

const Profile = withUser(ProfileBase as typeof Block);

export default Profile;
