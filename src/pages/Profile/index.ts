import Handlebars from 'handlebars';
import { profileTemplate } from './profile.tmpl';
import './profile.less';
import Block from '../../utils/Block';
import ProfileRow from '../../components/profile/profileRow';
import Input from '../../components/input';
import BackButton from '../../components/profile/backButton';

export interface IProfile {
  login: string;
  firstName: string;
  secondName: string;
  avatar: string;
  email: string;
  phone: string;
  displayName: string;
}

export default class Profile extends Block<IProfile> {
  constructor(props: IProfile) {
    super('div', props);
  }

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
          inputValue: this.props.firstName,
          inputClassList: ['profile__row-value-input'],
        }),
      }),
      new ProfileRow({
        rowLabel: 'Фамилия',
        rowInput: new Input({
          inputType: 'text',
          inputId: 'second_name',
          inputName: 'second_name',
          inputPlaceholder: 'Имя',
          inputRequired: 'required',
          inputDisabled: 'disabled',
          inputValue: this.props.secondName,
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
          inputValue: this.props.displayName,
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
