import { expect } from 'chai';
import ErrorPage from '../pages/ErrorPage';
import Block from './Block';
import Router from './Router';

describe('Router', () => {
  const router = new Router();
  router.use('/test', ErrorPage as typeof Block);
  router.use('/test2', ErrorPage as typeof Block);

  describe('method go', () => {
    it('should change window.history length', () => {
      router.go('/test');
      router.go('/test2');

      const { length } = window.history;

      expect(length).to.equal(3);
    });
  });

  describe('method back', () => {
    it('should NOT change window.history length', () => {
      router.back();

      const { length } = window.history;

      expect(length).to.equal(3);
    });
  });
});
