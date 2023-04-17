import '../Profile/profile.scss';
import Handlebars from 'handlebars';
import { profileEditTemplate } from './profileEdit.tmpl';
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
import { IChangeProfile } from '../../api/UserAPI';
import render from '../../utils/render';
import Modal from '../../components/modal';
import InputGroup from '../../components/inputGroup';
import AuthForm from '../../components/AuthForm';

const router = new Router();

class ProfileEditBase extends Block {
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
      text: 'Сохранить',
      classList: ['modal__button'],
      disabled: true,
    });

    this.children.changeAvatarButton = new Button({
      text: 'Изменить аватар',
      classList: ['type'],
      events: {
        click: (event) => {
          event.preventDefault();
          render(
            '#root',
            new Modal({
              modalHeader: 'Изменить аватар',
              modalContent: new AuthForm({
                inputgroups: [
                  new InputGroup({
                    input: new Input({
                      inputType: 'file',
                      inputName: 'avatar',
                      inputId: 'avatar',
                      inputClassList: ['fileInput'],
                      events: {
                        change: () => {
                          const input = document.querySelector(
                            '#avatar',
                          ) as HTMLInputElement;
                          const file = input.files?.[0];
                          const maxFileSize = 1024 * 1024;
                          if ((file?.size as number) > maxFileSize) {
                            input.value = '';
                          }
                        },
                      },
                    }),
                    errorMessage: 'Ощшыбка',
                    inputId: 'avatar',
                    inputLabel: '',
                  }),
                ],
                button: new Button({
                  text: 'Изменить',
                  type: 'submit',
                }),
                formID: 'changeAvatarForm',
                events: {
                  submit: (e: Event) => {
                    e.preventDefault();

                    const formData = new FormData(e.target as HTMLFormElement);

                    usersController.changeAvatar(formData).then(() => {
                      document.querySelector('.modal__backdrop')!.remove();
                    });
                  },
                },
              }),
            }),
          );
        },
      },
    });

    this.props.events = {
      submit: (event: Event) => {
        event.preventDefault();
        const isValid = validateField(event, 'profileEdit');

        const formData = new FormData(event.target as HTMLFormElement);

        const data: IChangeProfile = {
          login: '',
          email: '',
          first_name: '',
          second_name: '',
          display_name: '',
          phone: '',
        };

        formData.forEach((value, key) => {
          if (key in data) {
            data[key as keyof IChangeProfile] = value.toString();
          }
        });

        if (isValid) {
          usersController.changeProfile(data);
        }
      },
    };
  }

  render() {
    this.element!.id = 'profileEdit';
    this.element!.classList.add('profile-wrap');

    this.children.profileRows = [
      new ProfileRow({
        rowLabel: 'Логин',
        rowInput: new Input({
          inputType: 'text',
          inputId: 'login',
          inputName: 'login',
          inputPlaceholder: 'Логин',
          inputRequired: 'required',
          inputValue: this.props.user.data.login,
          inputClassList: ['profile__row-value-input'],
          events: {
            blur: (event) => validateField(event, 'profileEdit'),
            focus: (event) => validateField(event, 'profileEdit'),
            input: (event) => validateField(event, 'profileEdit'),
          },
        }),
        errorMessage:
          'Требования: от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)',
      }),
      new ProfileRow({
        rowLabel: 'Почта',
        rowInput: new Input({
          inputType: 'text',
          inputId: 'email',
          inputName: 'email',
          inputPlaceholder: 'Почта',
          inputRequired: 'required',
          inputValue: this.props.user.data.email,
          inputClassList: ['profile__row-value-input'],
          events: {
            blur: (event) => validateField(event, 'profileEdit'),
            focus: (event) => validateField(event, 'profileEdit'),
            input: (event) => validateField(event, 'profileEdit'),
          },
        }),
        errorMessage:
          'Требования: латиница, может включать цифры и спецсимволы вроде дефиса, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы',
      }),
      new ProfileRow({
        rowLabel: 'Имя',
        rowInput: new Input({
          inputType: 'text',
          inputId: 'first_name',
          inputName: 'first_name',
          inputPlaceholder: 'Имя',
          inputRequired: 'required',
          inputValue: this.props.user.data.first_name,
          inputClassList: ['profile__row-value-input'],
          events: {
            blur: (event) => validateField(event, 'profileEdit'),
            focus: (event) => validateField(event, 'profileEdit'),
            input: (event) => validateField(event, 'profileEdit'),
          },
        }),
        errorMessage:
          'Требования: латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)',
      }),
      new ProfileRow({
        rowLabel: 'Фамилия',
        rowInput: new Input({
          inputType: 'text',
          inputId: 'second_name',
          inputName: 'second_name',
          inputPlaceholder: 'Фамилия',
          inputRequired: 'required',
          inputValue: this.props.user.data.second_name,
          inputClassList: ['profile__row-value-input'],
          events: {
            blur: (event) => validateField(event, 'profileEdit'),
            focus: (event) => validateField(event, 'profileEdit'),
            input: (event) => validateField(event, 'profileEdit'),
          },
        }),
        errorMessage:
          'Требования: латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)',
      }),
      new ProfileRow({
        rowLabel: 'Имя в чате',
        rowInput: new Input({
          inputType: 'text',
          inputId: 'display_name',
          inputName: 'display_name',
          inputPlaceholder: 'Имя в чате',
          inputRequired: 'required',
          inputValue: this.props.user.data.display_name
            ? this.props.user.data.display_name
            : '',
          inputClassList: ['profile__row-value-input'],
          events: {
            blur: (event) => validateField(event, 'profileEdit'),
            focus: (event) => validateField(event, 'profileEdit'),
            input: (event) => validateField(event, 'profileEdit'),
          },
        }),
        errorMessage: 'Требования: больше одного символа',
      }),
      new ProfileRow({
        rowLabel: 'Телефон',
        rowInput: new Input({
          inputType: 'text',
          inputId: 'phone',
          inputName: 'phone',
          inputPlaceholder: 'Телефон',
          inputRequired: 'required',
          inputValue: this.props.user.data.phone,
          inputClassList: ['profile__row-value-input'],
          events: {
            blur: (event) => validateField(event, 'profileEdit'),
            focus: (event) => validateField(event, 'profileEdit'),
            input: (event) => validateField(event, 'profileEdit'),
          },
        }),
        errorMessage:
          'Требования: от 10 до 15 символов, состоит из цифр, может начинается с плюса',
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

const ProfileEdit = withUser(ProfileEditBase as typeof Block);

export default ProfileEdit;
