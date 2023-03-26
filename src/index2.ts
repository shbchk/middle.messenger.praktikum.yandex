import { FakePage } from './pages/FakePage';

const fakePage = new FakePage();

window.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.querySelector('#root');

  rootElement!.append(fakePage.getContent()!);
});
