import Handlebars from 'handlebars';
import profile from 'bundle-text:./profile.hbs';

import('./profile.less');

const { ProfileRow } = require('./profileRow');
const { BackButton } = require('./backButton');

const profileName = 'Васисуалий Початков';

const profileAvatar = 'https://api.lorem.space/image/fashion?w=200&h=200';

const profileRows = [
  ProfileRow({
    rowLabel: 'Почта',
    rowInputName: 'email',
    rowInputPlaceholder: 'Почта',
    rowInputValue: 'pochta@domain.tld',
  }),
  ProfileRow({
    rowLabel: 'Логин',
    rowInputName: 'login',
    rowInputPlaceholder: 'Логин',
    rowInputValue: 'myusername',
  }),
  ProfileRow({
    rowLabel: 'Имя',
    rowInputName: 'first_name',
    rowInputPlaceholder: 'Имя',
    rowInputValue: 'Васисуалий',
  }),
  ProfileRow({
    rowLabel: 'Фамилия',
    rowInputName: 'second_name',
    rowInputPlaceholder: 'Фамилия',
    rowInputValue: 'Початков',
  }),
  ProfileRow({
    rowLabel: 'Имя в чате',
    rowInputName: 'display_name',
    rowInputPlaceholder: 'Имя в чате',
    rowInputValue: 'Васисуалий Початков',
  }),
  ProfileRow({
    rowLabel: 'Телефон',
    rowInputName: 'phone',
    rowInputPlaceholder: 'Телефон',
    rowInputValue: '+77 (666) 55-44-33',
  }),
];

const backButton = BackButton();

export const Profile = () => {
  document.title = 'Редактировать профиль';
  return Handlebars.compile(profile)({ profileName, profileAvatar, profileRows, backButton });
};
