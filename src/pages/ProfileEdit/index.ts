import Handlebars from 'handlebars';
import { profileEditTemplate } from './profileEdit.tmpl';
import Block from '../../utils/Block';
import ProfileRow from '../../components/profile/profileRow';
import Input from '../../components/input';
import BackButton from '../../components/profile/backButton';
import { IUser } from '../Profile';
import ModalButton from '../../components/modalButton';
import { validateField } from '../../utils/validateField';

interface IProfileEdit {
  user: IUser;
  // eslint-disable-next-line no-unused-vars
  events: Record<string, (event: Event) => void>;
}

export default class ProfileEdit extends Block<IProfileEdit> {
  constructor(props: IProfileEdit) {
    super(props, 'form');
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
          inputValue: this.props.user.login,
          inputClassList: ['profile__row-value-input'],
          events: {
            blur: (event) => validateField(event, 'profileEdit'),
            focus: (event) => validateField(event, 'profileEdit'),
            input: (event) => validateField(event, 'profileEdit'),
          },
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
          inputValue: this.props.user.email,
          inputClassList: ['profile__row-value-input'],
          events: {
            blur: (event) => validateField(event, 'profileEdit'),
            focus: (event) => validateField(event, 'profileEdit'),
            input: (event) => validateField(event, 'profileEdit'),
          },
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
          inputValue: this.props.user.first_name,
          inputClassList: ['profile__row-value-input'],
          events: {
            blur: (event) => validateField(event, 'profileEdit'),
            focus: (event) => validateField(event, 'profileEdit'),
            input: (event) => validateField(event, 'profileEdit'),
          },
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
          inputValue: this.props.user.second_name,
          inputClassList: ['profile__row-value-input'],
          events: {
            blur: (event) => validateField(event, 'profileEdit'),
            focus: (event) => validateField(event, 'profileEdit'),
            input: (event) => validateField(event, 'profileEdit'),
          },
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
          inputValue: this.props.user.display_name,
          inputClassList: ['profile__row-value-input'],
          events: {
            blur: (event) => validateField(event, 'profileEdit'),
            focus: (event) => validateField(event, 'profileEdit'),
            input: (event) => validateField(event, 'profileEdit'),
          },
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
          inputValue: this.props.user.phone,
          inputClassList: ['profile__row-value-input'],
          events: {
            blur: (event) => validateField(event, 'profileEdit'),
            focus: (event) => validateField(event, 'profileEdit'),
            input: (event) => validateField(event, 'profileEdit'),
          },
        }),
      }),
    ];

    this.children.backButton = new BackButton({
      link: '/profile.html',
    });

    this.children.saveButton = new ModalButton({
      id: 'submit-button',
      type: 'submit',
      text: 'Сохранить',
      link: '/profile.html',
    });
  }

  render() {
    this.element!.id = 'profileEdit';

    return this.compile(Handlebars.compile(profileEditTemplate), {
      ...this.props,
      profileRows: Array.isArray(this.children.profileRows)
        ? this.children.profileRows.map((profileRow) => profileRow.getContent())
        : this.children.profileRows.getContent(),
      saveButton: this.children.saveButton,
    });
  }
}
