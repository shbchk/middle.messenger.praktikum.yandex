export const chatlistTemplate = `

<div class="chatlist__header">
  <div class="chatlist__header-profile">
    <div class="chatlist__avatar-wrap">
      <img
        src="{{avatar}}"
        class="chatlist__avatar chatlist__avatar--profile"
        alt="Аватар: {{displayName}}"
      />
    </div>
    <div class="chatlist__chat-preview">
      <div class="chatlist__chatheading">{{displayName}}</div>
      <a href="/profile.html" class="chatlist__chattext">Профиль</a>
    </div>

  </div>
  {{{chatSearch}}}
</div>

{{#each chatPreviews}}
  {{{this}}}
{{/each}}

`;
