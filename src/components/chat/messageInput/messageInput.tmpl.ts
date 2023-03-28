export const messageInputTemplate = `

  <div class="messages__attachments-button-wrap">
    <button type="button" class="messages__button">📎</button>
  </div>

  <div class="messages__input-wrap">
    <label class="messages__input-box">
      {{{ textarea }}}
    </label>
    <button type="submit" class="messages__button">➡️</button>
  </div>

`;

// <textarea rows="1" name="message" class="messages__message-textarea" placeholder="Сообщение" oninput="this.parentNode.dataset.value = this.value"></textarea>
