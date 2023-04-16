import { AVATARSTUB } from '../../AVATARSTUB';

export const profileEditTemplate: string = `<div class="profile-wrap">

  <div class="profile__avatar-wrap">
  <img src="{{#if user.data.avatar}}https://ya-praktikum.tech/api/v2/resources/{{user.data.avatar}}{{else}}${AVATARSTUB}{{/if}}" class="profile__avatar" alt="Аватар"/>
  </div>

  {{{ changeAvatarButton }}}

  <div class="profile__display-name">{{user.display_name}}</div>

  <div class="profile__rows">
    {{#each profileRows}}
      {{{this}}}
    {{/each}}
    
    {{#if user.hasError}}
      <div class="dangerMessage">{{user.errorReason}}</div>
    {{/if}}

    {{{saveButton}}}
  </div>
</div>

{{{backButton}}}

`;
