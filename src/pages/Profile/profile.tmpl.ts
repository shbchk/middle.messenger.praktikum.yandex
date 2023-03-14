export const profileTemplate: string = `<div class="profile-wrap">

  <div class="profile__avatar-wrap">
    <img src="{{profileAvatar}}" class="profile__avatar" alt="Аватар" />
    <div class="profile__avatar-change-overlay">Изменить аватар</div>
  </div>
  <div class="profile__display-name">{{profileName}}</div>

  <div class="profile__rows">
    {{#each profileRows}}
      {{{this}}}
    {{/each}}
  </div>

  <div class="profile__rows">

    <div class="profile__row">
      <div class="profile__row-label"><a href="/edit.html" class="profile__edit-button" type="button">Изменить данные</a>
      </div>
    </div>

    <div class="profile__row">
      <div class="profile__row-label"><a href="/password.html" class="profile__edit-button" type="button">Изменить пароль</a>
      </div>
    </div>

    <div class="profile__row">
      <div class="profile__row-label"><a href="/signin.html" class="profile__edit-button profile__edit-button--logout" type="button">Выйти</a></div>
    </div>

  </div>
</div>

{{{backButton}}}`;