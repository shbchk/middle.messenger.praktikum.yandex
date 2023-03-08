import Handlebars from 'handlebars';
import profileRow from 'bundle-text:./profileRow.hbs';
import('./profileRow.less');

export const ProfileRow = ({ rowLabel, rowInputName, rowInputPlaceholder, rowInputValue, rowInputType = 'text' }) => Handlebars.compile(profileRow)({ rowLabel, rowInputName, rowInputPlaceholder, rowInputValue, rowInputType });
