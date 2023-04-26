import { expect } from 'chai';
import Signin from '.';

describe('Signin component', () => {
  it('expect(classList).to.contain(modal__backdrop)', () => {
    const signin = new Signin({});
    const { classList } = signin.element!;
    expect(classList).to.contain('modal__backdrop');
  });
});
