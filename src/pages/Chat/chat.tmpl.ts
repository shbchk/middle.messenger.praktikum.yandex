export const chatTemplate: string = `
  {{{ chatList }}}

  {{#if messages}}
    {{{ messages }}}
  {{else}}
  <div class="messages__empty-message">
    Выберите чат слева, чтобы отправить сообщение
  </div>
  {{/if}}
`;
