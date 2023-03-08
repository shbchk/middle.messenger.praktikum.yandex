import Handlebars from 'handlebars';
import backButton from 'bundle-text:./backButton.hbs';
import('./backButton.less');

export const BackButton = () => Handlebars.compile(backButton)();
