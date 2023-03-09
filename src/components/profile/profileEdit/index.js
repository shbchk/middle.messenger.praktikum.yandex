import Handlebars from 'handlebars';
import profileEdit from 'bundle-text:./profileEdit.hbs';

import('../profile.less');

const { ProfileRow } = require('../profileRow');
const { BackButton } = require('../backButton');
const { ModalButton } = require('../../modalButton');

const profileName = 'Васисуалий Початков';

const profileAvatar = 'https://xsgames.co/randomusers/avatar.php?g=male';

const profileRows = [
  ProfileRow({
    rowLabel: 'Почта',
    rowInputName: 'email',
    rowInputPlaceholder: 'Почта',
    rowInputValue: 'pochta@domain.tld',
    rowInputDisabled: '',
  }),
  ProfileRow({
    rowLabel: 'Логин',
    rowInputName: 'login',
    rowInputPlaceholder: 'Логин',
    rowInputValue: 'myusername',
    rowInputDisabled: '',
  }),
  ProfileRow({
    rowLabel: 'Имя',
    rowInputName: 'first_name',
    rowInputPlaceholder: 'Имя',
    rowInputValue: 'Васисуалий',
    rowInputDisabled: '',
  }),
  ProfileRow({
    rowLabel: 'Фамилия',
    rowInputName: 'second_name',
    rowInputPlaceholder: 'Фамилия',
    rowInputValue: 'Початков',
    rowInputDisabled: '',
  }),
  ProfileRow({
    rowLabel: 'Имя в чате',
    rowInputName: 'display_name',
    rowInputPlaceholder: 'Имя в чате',
    rowInputValue: 'Васисуалий Початков',
    rowInputDisabled: '',
  }),
  ProfileRow({
    rowLabel: 'Телефон',
    rowInputName: 'phone',
    rowInputPlaceholder: 'Телефон',
    rowInputValue: '+77 (666) 55-44-33',
    rowInputDisabled: '',
  }),
];

const backButton = BackButton();
const saveButton = ModalButton({ type: 'button', text: 'Сохранить' });

export const ProfileEdit = () => {
  document.title = 'Редактировать профиль';
  return Handlebars.compile(profileEdit)({ profileName, profileAvatar, profileRows, backButton, saveButton });
};
