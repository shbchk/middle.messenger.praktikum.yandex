import '../Profile/profile.scss';
import Handlebars from 'handlebars';
import { profileEditTemplate } from '../ProfileEdit/profileEdit.tmpl';
import Block from '../../utils/Block';
import ProfileRow from '../../components/profile/profileRow';
import Input from '../../components/input';
import BackButton from '../../components/profile/backButton';
import { withStore } from '../../utils/Store';
import authController from '../../controllers/AuthController';
import usersController from '../../controllers/UsersController';
import Router from '../../utils/Router';
import { ROUTES } from '../../ROUTES';
import Button from '../../components/button';
import { validateField } from '../../utils/validateField';
import { IChangePassword } from '../../api/UserAPI';

const router = new Router();

class PasswordChangeBase extends Block {
  constructor(props: { events: Record<string, (event: Event) => void> }) {
    super(props, 'form');
  }

  init() {
    authController.checkAuth().then(async (loggedIn) => {
      if (!loggedIn) {
        router.go(ROUTES.index);
      }
    });

    this.children.backButton = new BackButton();

    this.children.saveButton = new Button({
      id: 'submit-button',
      type: 'submit',
      text: 'Изменить пароль',
      classList: ['modal__button'],
      disabled: true,
    });

    this.props.events = {
      submit: (event: Event) => {
        event.preventDefault();
        const isValid = validateField(event, 'profileEdit');

        const formData = new FormData(event.target as HTMLFormElement);

        const data: IChangePassword = {
          oldPassword: '',
          newPassword: '',
        };

        formData.forEach((value, key) => {
          if (key in data) {
            data[key as keyof IChangePassword] = value.toString();
          }
        });

        if (isValid) {
          usersController.changePassword(data);
        }
      },
    };
  }

  render() {
    this.element!.id = 'passwordChange';
    this.element!.classList.add('profile-wrap');

    this.children.profileRows = [
      new ProfileRow({
        rowLabel: 'Старый',
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
            input: (event) => validateField(event, 'passwordChange'),
          },
        }),
        errorMessage:
          'Требования: от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
      }),
      new ProfileRow({
        rowLabel: 'Новый пароль',
        rowInput: new Input({
          inputType: 'password',
          inputId: 'password',
          inputName: 'newPassword',
          inputPlaceholder: 'Новый пароль',
          inputRequired: 'required',
          inputClassList: ['profile__row-value-input'],
          events: {
            blur: (event) => validateField(event, 'passwordChange'),
            focus: (event) => validateField(event, 'passwordChange'),
            input: (event) => validateField(event, 'passwordChange'),
          },
        }),
        errorMessage:
          'Требования: от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
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
            input: (event) => validateField(event, 'passwordChange'),
          },
        }),
        errorMessage: 'Пароли не совпадают :(',
      }),
    ];

    return this.compile(Handlebars.compile(profileEditTemplate), {
      ...this.props,
      profileRows: this.children.profileRows.map((profileRow) =>
        profileRow.getContent(),
      ),
      saveButton: this.children.saveButton,
    });
  }
}

const withUser = withStore((state) => ({ user: { ...state.user } }));

const PasswordChange = withUser(PasswordChangeBase as typeof Block);

export default PasswordChange;
