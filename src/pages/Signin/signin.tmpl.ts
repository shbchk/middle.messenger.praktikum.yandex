export const signinTemplate: string = `
  {{#each inputgroups}}
    {{{this}}}
  {{/each}}

  <div class='signin__buttonsgroup'>
    {{{button}}}
    <a href='/signup.html' class='signin__authlink'>Ещё не зарегистрированы?</a>
  </div>
`;
