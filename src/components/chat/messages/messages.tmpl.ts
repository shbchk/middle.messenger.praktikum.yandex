export const messagesTemplate = `
{{#if messagesArray}}
  <div class="messages__messages-wrap">
    {{#each messagesArray }}
      {{{ this }}}
    {{/each}}
  </div>

  {{{ messagesInput }}}
{{else}}
  <div class="messages__empty-message">
    Выберите чат слева, чтобы отправить сообщение
  </div>
{{/if}}
`;
