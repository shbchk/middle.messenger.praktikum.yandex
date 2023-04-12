export const authformTemplate: string = `
  {{#each inputgroups}}
    {{{this}}}
  {{/each}}

  <div class='auth__buttonsgroup'>
    {{{button}}}
    {{{link}}}
  </div>
`;
