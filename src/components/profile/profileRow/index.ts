import Handlebars from 'handlebars';
import { profileRowTemplate } from './profileRow.tmpl';
import './profileRow.less';

interface IProfileRow {
  rowLabel: string;
  rowInputName: string;
  rowInputPlaceholder: string;
  rowInputValue: string;
  rowInputType?: string;
  rowInputDisabled?: string;
}

export const ProfileRow = ({
  rowLabel,
  rowInputName,
  rowInputPlaceholder,
  rowInputValue,
  rowInputType = 'text',
  rowInputDisabled,
}: IProfileRow) =>
  Handlebars.compile(profileRowTemplate)({
    rowLabel,
    rowInputName,
    rowInputPlaceholder,
    rowInputValue,
    rowInputType,
    rowInputDisabled,
  });
