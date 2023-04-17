import Handlebars from 'handlebars';
import { authformTemplate } from './authform.tmpl';
import './authform.scss';
import Block from '../../utils/Block';
import { withStore } from '../../utils/Store';

interface IAuthForm {
  inputgroups: Block[];
  button: Block;
  link: Block;
  formID: string;
  events: Record<string, (event: Event) => void>;
}

class AuthFormBase extends Block<IAuthForm> {
  constructor(props: IAuthForm) {
    super(props, 'form');
  }

  render() {
    this.element!.id = this.props.formID;

    return this.compile(Handlebars.compile(authformTemplate), {
      ...this.props,
      inputgroups: Array.isArray(this.children.inputgroups)
        ? this.children.inputgroups.map((inputgroup) => inputgroup.getContent())
        : this.children.inputgroups.getContent(),
    });
  }
}

const withUser = withStore<IAuthForm>((state) => ({ user: { ...state.user } }));

const AuthForm = withUser(AuthFormBase as typeof Block);

export default AuthForm;
