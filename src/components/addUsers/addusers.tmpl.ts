export const addusersTemplate: string = `
  {{#each inputgroups}}
    {{{this}}}
  {{/each}}

  {{#if addUsers.hasError}}
      <div class="dangerMessage">{{user.errorReason}}</div>
  {{/if}}

  {{#if usersFound}}
    <div class="addusers_chosen-users">
      <b>Найденные пользователи:</b><br>
      {{#each usersFound}}
        {{{this}}}
      {{/each}}
    </div>
  {{/if}}

  <div class='auth__buttonsgroup'>
    {{{searchButton}}}
  </div>

  {{#if usersToAdd}}
    <div class="addusers_chosen-users">
      <b>Выбранные пользователи:</b><br>
      {{#each usersToAdd}}
        {{{this}}}
      {{/each}}
    </div>
    <div class='auth__buttonsgroup'>
      {{{addButton}}}
    </div>    
  {{/if}}
`;
