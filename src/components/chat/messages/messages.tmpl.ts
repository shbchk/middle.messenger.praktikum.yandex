export const messagesTemplate = `

{{#if chat.currentChatId}}
  <div class="messages__messages-wrap">

    {{#each messagesArray }}
      {{{ this }}}
    {{/each}}
  </div>

  {{{ messagesInput }}}

  <div class="messages__infobar">
    {{#each userList }}<span class="messages_user-in-chat">{{this}}</span>{{/each}}
    {{{ addUserButton }}}
  </div>
{{else}}
  <div class="messages__empty-message">
    Выберите чат слева, чтобы отправить сообщение
  </div>
{{/if}}
`;
