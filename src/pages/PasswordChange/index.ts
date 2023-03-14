import Handlebars from 'handlebars';
import { profileEditTemplate } from '../ProfileEdit/profileEdit.tmpl';
import { ModalButton } from '../../components/modalButton';
import { BackButton } from '../../components/profile/backButton';
import { ProfileRow } from '../../components/profile/profileRow';

import '../Profile/profile.less';

const profileName = 'Васисуалий Початков';

const profileAvatar = 'https://xsgames.co/randomusers/avatar.php?g=male';

const profileRows = [
  ProfileRow({
    rowLabel: 'Старенький пароль',
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
const saveButton = ModalButton({
  type: 'button',
  text: 'Изменить',
  link: '/chat.html',
});

export const PasswordChange = () => {
  // eslint-disable-next-line no-undef
  document.title = 'Изменить пароль';
  return Handlebars.compile(profileEditTemplate)({
    profileName,
    profileAvatar,
    profileRows,
    backButton,
    saveButton,
  });
};
