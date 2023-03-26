export const signupTemplate: string = `
  {{#each inputgroups}}
    {{{this}}}
  {{/each}}

  <div class='signup__buttonsgroup'>
    {{{button}}}
    <a href='/signin.html' class='signup__authlink'>Уже есть аккаунт?</a>
  </div>
`;
