export const chatlistTemplate = `

<div class="chatlist__header">
  <div class="chatlist__header-profile">
    <div class="chatlist__avatar-wrap">
      <img
        src="{{user.avatar}}"
        class="chatlist__avatar chatlist__avatar--profile"
        alt="Аватар: {{user.display_name}}"
      />
    </div>
    <div class="chatlist__chat-preview">
      <div class="chatlist__chatheading">{{user.display_name}}</div>
      <a href="/profile.html" class="chatlist__chattext">Профиль</a>
    </div>

  </div>
  {{{chatSearch}}}
</div>

{{#each chatPreviews}}
  {{{this}}}
{{/each}}

`;
