import Handlebars from 'handlebars';
import profileEdit from 'bundle-text:../profileEdit/profileEdit.hbs';

import('../profile.less');

const { ProfileRow } = require('../profileRow');
const { BackButton } = require('../backButton');
const { ModalButton } = require('../../modalButton');

const profileName = 'Васисуалий Початков';

const profileAvatar = 'https://xsgames.co/randomusers/avatar.php?g=male';

const profileRows = [
  ProfileRow({
    rowLabel: 'Старый пароль',
    rowInputName: 'oldPassword',
    rowInputPlaceholder: '',
    rowInputValue: '',
    rowInputDisabled: '',
    rowInputType: 'password',
  }),
  ProfileRow({
    rowLabel: 'Новый пароль',
    rowInputName: 'newPassword',
    rowInputPlaceholder: '',
    rowInputValue: '',
    rowInputDisabled: '',
    rowInputType: 'password',
  }),
  ProfileRow({
    rowLabel: 'Еще раз новый пароль',
    rowInputName: 'newPasswordConfirm',
    rowInputPlaceholder: '',
    rowInputValue: '',
    rowInputDisabled: '',
    rowInputType: 'password',
  }),
];

const backButton = BackButton();
const saveButton = ModalButton({ type: 'button', text: 'Изменить пароль' });

export const PasswordChange = () => {
  document.title = 'Изменить пароль';
  return Handlebars.compile(profileEdit)({ profileName, profileAvatar, profileRows, backButton, saveButton });
};
