export const signupTemplate: string = `
  {{#each inputgroups}}
    {{{this}}}
  {{/each}}

  <div class='signup__buttonsgroup'>
    {{{button}}}
    {{{link}}}
  </div>
`;
