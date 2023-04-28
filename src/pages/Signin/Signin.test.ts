import { expect } from 'chai';
import Signin from '.';

describe('Signin component', () => {
  const signin = new Signin({});

  it('should contain modal__backdrop class', () => {
    const isModalBackdrop =
      signin.element!.classList.contains('modal__backdrop');
    expect(isModalBackdrop).to.equal(true);
  });

  it('should change document.title to "Авторизация"', () => {
    const { title } = document;
    expect(title).to.equal('Авторизация');
  });
});
