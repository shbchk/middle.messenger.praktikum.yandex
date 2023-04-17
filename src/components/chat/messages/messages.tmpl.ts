export const messagesTemplate = `

{{#if chat.currentChatId}}
  <div class="messages__messages-wrap">

    {{#each messagesArray }}
      {{{ this }}}
    {{/each}}
  </div>

  {{{ messagesInput }}}

  <div class="messages__infobar">
    <div class="messages__users-in-chat">
      {{#each userList }}{{{this}}}{{/each}}
    </div>
    <div class="messages__infobar-buttons">
      {{{ addUserButton }}}

      {{{ deleteChatButton }}}
    </div>
  </div>
{{else}}
  <div class="messages__empty-message">
    Выберите чат слева, чтобы отправить сообщение
  </div>
{{/if}}
`;
