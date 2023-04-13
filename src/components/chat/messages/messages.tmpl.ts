export const messagesTemplate = `
<div class="messages__messages-wrap">
  {{#each messagesArray }}
    {{{ this }}}
  {{/each}}
</div>

{{{ messagesInput }}}
`;
