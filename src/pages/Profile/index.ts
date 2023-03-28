import Handlebars from 'handlebars';
import { profileTemplate } from './profile.tmpl';
import './profile.less';
import Block from '../../utils/Block';
import ProfileRow from '../../components/profile/profileRow';
import Input from '../../components/input';
import BackButton from '../../components/profile/backButton';

export interface IUser {
  id?: number;
  first_name: string;
  second_name: string;
  display_name: string;
  avatar: string;
  email: string;
  login: string;
  phone: string;
}

export default class Profile extends Block<IUser> {
  init() {
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
          inputValue: this.props.display_name,
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
  }

  render() {
    return this.compile(Handlebars.compile(profileTemplate), {
      ...this.props,
      profileRows: Array.isArray(this.children.profileRows)
        ? this.children.profileRows.map((profileRow) => profileRow.getContent())
        : this.children.profileRows.getContent(),
    });
  }
}
