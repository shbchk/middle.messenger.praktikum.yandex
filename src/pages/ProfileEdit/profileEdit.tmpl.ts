export const profileEditTemplate: string = `<div class="profile-wrap">

  <div class="profile__avatar-wrap">
    <img src="{{profileAvatar}}" class="profile__avatar" alt="Аватар" />
    <div class="profile__avatar-change-overlay">Изменить аватар</div>
  </div>
  <div class="profile__display-name">{{profileName}}</div>

  <form class="profile__rows">
    {{#each profileRows}}
      {{{this}}}
    {{/each}}

    {{{saveButton}}}
  </form>
</div>

{{{backButton}}}`;