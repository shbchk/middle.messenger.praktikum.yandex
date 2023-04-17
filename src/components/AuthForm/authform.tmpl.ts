export const authformTemplate: string = `
  {{#each inputgroups}}
    {{{this}}}
  {{/each}}

  {{#if user.hasError}}
      <div class="dangerMessage">{{user.errorReason}}</div>
  {{/if}}

  <div class='auth__buttonsgroup'>
    {{{button}}}
    {{{link}}}
  </div>
`;
