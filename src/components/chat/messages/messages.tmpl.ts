export const messagesTemplate = `

{{#if messages.currentChatId}}
  <div class="messages__messages-wrap">
    {{#each data.messagesArray }}
      {{{ this }}}
    {{/each}}
  </div>

  {{{ messagesInput }}}

  <div class="messages__infobar">
    В чате: {{#each userList }}<span>{{this}}</span>{{/each}}
    {{{ addUserButton }}}
  </div>
{{else}}
  <div class="messages__empty-message">
    Выберите чат слева, чтобы отправить сообщение
  </div>
{{/if}}
`;
