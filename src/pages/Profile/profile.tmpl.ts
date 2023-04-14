// eslint-disable-next-line import/no-cycle

import { AVATARSTUB } from '../../AVATARSTUB';

export const profileTemplate: string = `<div class="profile-wrap">

  <div class="profile__avatar-wrap">
    <img src="{{#if user.data.avatar}}{{user.data.avatar}}{{else}}${AVATARSTUB}{{/if}}" class="profile__avatar" alt="Аватар"/>
    <div class="profile__avatar-change-overlay">Изменить аватар</div>
  </div>
  <div class="profile__display-name">{{display_name}}</div>

  <div class="profile__rows">
    {{#each profileRows}}
      {{{this}}}
    {{/each}}
  </div>

  <div class="profile__rows">

    <div class="profile__row">
      <div class="profile__row-label">{{{ settingsLink }}}</div>
    </div>

    <div class="profile__row">
      <div class="profile__row-label">{{{ passwordLink }}}</div>
    </div>

    <div class="profile__row">
      <div class="profile__row-label">{{{ logoutLink }}}</div>
    </div>

  </div>
</div>

{{{backButton}}}`;
