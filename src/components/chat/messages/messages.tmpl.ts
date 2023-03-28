export const messagesTemplate = `
<div class="messages__messages-wrap">
  {{#each messagesArray }}
    {{{ this }}}
  {{/each}}
</div>

{{{ messagesInput }}}
`;

// <div class="messages__input-wrap">
//   <div class="messages__attachments-button-wrap">
//     <button type="button" class="messages__button">📎</button>
//   </div>

//   <form class="messages__input-wrap">
//     <label class="messages__input-box">
//       <textarea rows="1" name="message" class="messages__message-textarea" placeholder="Сообщение" oninput="this.parentNode.dataset.value = this.value"></textarea>
//     </label>
//     <button type="submit" class="messages__button">➡️</button>
//   </form>
// </div>
