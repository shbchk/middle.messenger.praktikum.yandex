import { expect } from 'chai';
import Link from '.';
import Block from '../../utils/Block';

describe('Link component', () => {
  const href = 'href';
  const text = 'text';
  const id = 'id';
  const target = '_blank';
  const title = 'title';
  const classList = ['testclass'];

  const testlink = new Link({
    href,
    text,
    id,
    target,
    title,
    classList,
  });

  it('should be an instance of Block', () => {
    expect(testlink).to.be.an.instanceof(Block);
  });

  it('should have title as passed', () => {
    expect(testlink.element?.title).to.equal(title);
  });

  it('should have id as passed', () => {
    expect(testlink.element?.id).to.equal(id);
  });

  it('should have href as passed', () => {
    expect(
      (testlink.element as HTMLAnchorElement).href.endsWith(href),
    ).to.equal(true);
  });

  it('should have target as passed', () => {
    expect((testlink.element as HTMLAnchorElement).target).to.equal(target);
  });

  it('should have text as passed', () => {
    expect(testlink.element?.textContent).to.equal(text);
  });

  it('should have classList as passed', () => {
    expect(testlink.element?.classList.contains(classList[0])).to.equal(true);
  });
});
