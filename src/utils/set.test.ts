import { expect } from 'chai';
import set from './set';

describe('function set', () => {
  it('should throw an Error if path not a string', () => {
    const callSet = () => set({ a: 'b' }, null, undefined);

    expect(callSet).to.throw(Error);
  });

  it('should return first param of it is not an object', () => {
    const result = set(null, '', '');
    expect(result).to.equal(null);
  });

  it('should return the same object (link)', () => {
    const testObj = { a: 'b', b: 'a' };
    const result = set(testObj, 'c.b', 'a');

    expect(result).to.equal(testObj);
  });

  it('should add value to the object by provided path', () => {
    const testObj = { a: 'b', b: 'a' };
    const resultObj = { a: 'b', b: 'a', ab: { c: { d: 'abcd' } } };
    const result = set(testObj, 'ab.c.d', 'abcd');
    expect(result).to.eql(resultObj);
  });
});
