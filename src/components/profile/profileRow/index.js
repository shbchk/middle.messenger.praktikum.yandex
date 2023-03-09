import Handlebars from 'handlebars';
import { profileRowTemplate } from './profileRow.tmpl';
import('./profileRow.less');

export const ProfileRow = ({ rowLabel, rowInputName, rowInputPlaceholder, rowInputValue, rowInputType = 'text', rowInputDisabled }) =>
  Handlebars.compile(profileRowTemplate)({ rowLabel, rowInputName, rowInputPlaceholder, rowInputValue, rowInputType, rowInputDisabled });
