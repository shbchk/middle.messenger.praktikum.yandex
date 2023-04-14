import Block from './Block';

type Nullable<T> = T | null;

const render = (
  querySelector: string,
  block: Block,
): Nullable<HTMLDivElement> => {
  const root: Nullable<HTMLDivElement> = document.querySelector(
    querySelector,
  ) as HTMLDivElement;

  if (!root) {
    throw new Error('There is no target element for rendering');
  }

  root.append(block.getContent() as HTMLElement);

  block.dispatchComponentDidMount();

  return root;
};

export default render;
