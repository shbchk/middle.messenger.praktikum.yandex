import { AVATARSTUB } from '../../AVATARSTUB';

export const profileEditTemplate: string = `<div class="profile-wrap">

  <div class="profile__avatar-wrap">
  <img src="{{#if user.data.avatar}}{{user.data.avatar}}{{else}}${AVATARSTUB}{{/if}}" class="profile__avatar" alt="Аватар"/>
    <div class="profile__avatar-change-overlay">Изменить аватар</div>
  </div>
  <div class="profile__display-name">{{user.display_name}}</div>

  <div class="profile__rows">
    {{#each profileRows}}
      {{{this}}}
    {{/each}}

    {{{saveButton}}}
  </div>
</div>

{{{backButton}}}

`;
