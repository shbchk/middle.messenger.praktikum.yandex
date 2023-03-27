import Handlebars from 'handlebars';
import { profileEditTemplate } from '../ProfileEdit/profileEdit.tmpl';
import '../ProfileEdit/profileEdit.less';
import Block from '../../utils/Block';
import ProfileRow from '../../components/profile/profileRow';
import Input from '../../components/input';
import BackButton from '../../components/profile/backButton';
import { IProfile } from '../Profile';
import ModalButton from '../../components/modalButton';
import { validateField } from '../../utils/validateField';

interface IPasswordChange extends IProfile {
  // eslint-disable-next-line no-unused-vars
  events: Record<string, (event: Event) => void>;
}

export default class PasswordChange extends Block<IPasswordChange> {
  constructor(props: IPasswordChange) {
    super('form', props);
  }

  init() {
    this.children.profileRows = [
      new ProfileRow({
        rowLabel: 'Старенький пароль',
        rowInput: new Input({
          inputType: 'password',
          inputId: 'oldPassword',
          inputName: 'oldPassword',
          inputPlaceholder: 'Старый пароль',
          inputRequired: 'required',
          inputClassList: ['profile__row-value-input'],
          events: {
            blur: (event) => validateField(event, 'passwordChange'),
            focus: (event) => validateField(event, 'passwordChange'),
          },
        }),
      }),
      new ProfileRow({
        rowLabel: 'Новый пароль',
        rowInput: new Input({
          inputType: 'password',
          inputId: 'password',
          inputName: 'password',
          inputPlaceholder: 'Новый пароль',
          inputRequired: 'required',
          inputClassList: ['profile__row-value-input'],
          events: {
            blur: (event) => validateField(event, 'passwordChange'),
            focus: (event) => validateField(event, 'passwordChange'),
          },
        }),
      }),
      new ProfileRow({
        rowLabel: 'Еще раз новый пароль',
        rowInput: new Input({
          inputType: 'password',
          inputId: 'password_confirm',
          inputName: 'password_confirm',
          inputPlaceholder: 'Еще раз новый пароль',
          inputRequired: 'required',
          inputClassList: ['profile__row-value-input'],
          events: {
            blur: (event) => validateField(event, 'passwordChange'),
            focus: (event) => validateField(event, 'passwordChange'),
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
      text: 'Изменить пароль',
      link: '/profile.html',
    });
  }

  render() {
    this.element!.id = 'passwordChange';

    return this.compile(Handlebars.compile(profileEditTemplate), {
      ...this.props,
      profileRows: Array.isArray(this.children.profileRows)
        ? this.children.profileRows.map((profileRow) => profileRow.getContent())
        : this.children.profileRows.getContent(),
      saveButton: this.children.saveButton,
    });
  }
}
