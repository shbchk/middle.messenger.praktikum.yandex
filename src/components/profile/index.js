import Handlebars from 'handlebars';
import profile from 'bundle-text:./profile.hbs';

import('./profile.less');

const { ProfileRow } = require('./profileRow');
const { BackButton } = require('./backButton');

const profileName = 'Васисуалий Початков';

const profileAvatar = 'https://xsgames.co/randomusers/avatar.php?g=male';

const profileRows = [
  ProfileRow({
    rowLabel: 'Почта',
    rowInputName: 'email',
    rowInputPlaceholder: 'Почта',
    rowInputValue: 'pochta@domain.tld',
    rowInputDisabled: 'disabled',
  }),
  ProfileRow({
    rowLabel: 'Логин',
    rowInputName: 'login',
    rowInputPlaceholder: 'Логин',
    rowInputValue: 'myusername',
    rowInputDisabled: 'disabled',
  }),
  ProfileRow({
    rowLabel: 'Имя',
    rowInputName: 'first_name',
    rowInputPlaceholder: 'Имя',
    rowInputValue: 'Васисуалий',
    rowInputDisabled: 'disabled',
  }),
  ProfileRow({
    rowLabel: 'Фамилия',
    rowInputName: 'second_name',
    rowInputPlaceholder: 'Фамилия',
    rowInputValue: 'Початков',
    rowInputDisabled: 'disabled',
  }),
  ProfileRow({
    rowLabel: 'Имя в чате',
    rowInputName: 'display_name',
    rowInputPlaceholder: 'Имя в чате',
    rowInputValue: 'Васисуалий Початков',
    rowInputDisabled: 'disabled',
  }),
  ProfileRow({
    rowLabel: 'Телефон',
    rowInputName: 'phone',
    rowInputPlaceholder: 'Телефон',
    rowInputValue: '+77 (666) 55-44-33',
    rowInputDisabled: 'disabled',
  }),
];

const backButton = BackButton();

export const Profile = () => {
  document.title = 'Профиль';
  return Handlebars.compile(profile)({ profileName, profileAvatar, profileRows, backButton });
};
