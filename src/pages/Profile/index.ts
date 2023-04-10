import Handlebars from 'handlebars';
import { profileTemplate } from './profile.tmpl';
import './profile.scss';
import Block from '../../utils/Block';
import ProfileRow from '../../components/profile/profileRow';
import Input from '../../components/input';
import BackButton from '../../components/profile/backButton';
import { IUser } from '../../api/AuthAPI';
import { withStore } from '../../utils/Store';
import authController from '../../controllers/AuthController';

class ProfileBase extends Block<IUser> {
  init() {
    authController.fetchUser();
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
          inputDisabled: 'disabled',
          inputValue: this.props.login,
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
          inputDisabled: 'disabled',
          inputValue: this.props.email,
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
          inputDisabled: 'disabled',
          inputValue: this.props.first_name,
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
          inputDisabled: 'disabled',
          inputValue: this.props.second_name,
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
          inputDisabled: 'disabled',
          inputValue: this.props.display_name
            ? this.props.display_name
            : `${this.props.first_name} ${this.props.second_name}`,
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
          inputDisabled: 'disabled',
          inputValue: this.props.phone,
          inputClassList: ['profile__row-value-input'],
        }),
      }),
    ];

    this.children.backButton = new BackButton({
      link: '/chat.html',
    });

    return this.compile(Handlebars.compile(profileTemplate), {
      ...this.props,
      profileRows: this.children.profileRows.map((profileRow) =>
        profileRow.getContent(),
      ),
    });
  }
}

const withUser = withStore((state) => ({ ...state.user }));

const Profile = withUser(ProfileBase as typeof Block);

export default Profile;
