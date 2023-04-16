import { AVATARSTUB } from '../../../AVATARSTUB';
import { ROUTES } from '../../../ROUTES';

export const chatlistTemplate = `

<div class="chatlist__header">
  <div class="chatlist__header-profile">
    <div class="chatlist__avatar-wrap">
      <img
        src="
      {{#if user.data.avatar}}
        https://ya-praktikum.tech/api/v2/resources/{{user.data.avatar}}
      {{else}}
        ${AVATARSTUB}
      {{/if}}
      "
        class="chatlist__avatar chatlist__avatar--profile"
        alt="Аватар"
      />
    </div>
    <div class="chatlist__chat-preview">
      <div class="chatlist__chatheading">
      {{#if user.data.display_name}}
        {{user.data.display_name}}
      {{else}}
        {{user.data.first_name}} {{user.data.second_name}}
      {{/if}}
      </div>
      {{{ profileLink }}}
    </div>

  </div>
  {{{chatSearch}}}
</div>

{{#each chatPreviews}}
  {{{this}}}
{{/each}}

{{{addChatButton}}}

`;
