export const signinTemplate: string = `
  {{#each inputgroups}}
    {{{this}}}
  {{/each}}

  <div class='signin__buttonsgroup'>
    {{{button}}}
    {{{link}}}
  </div>
`;
