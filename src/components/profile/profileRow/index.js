import Handlebars from 'handlebars';
import profileRow from 'bundle-text:./profileRow.hbs';
import('./profileRow.less');

export const ProfileRow = ({ rowLabel, rowInputName, rowInputPlaceholder, rowInputValue, rowInputType = 'text', rowInputDisabled }) =>
  Handlebars.compile(profileRow)({ rowLabel, rowInputName, rowInputPlaceholder, rowInputValue, rowInputType, rowInputDisabled });
