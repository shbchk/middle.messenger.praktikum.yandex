export const messageTemplate = `


  {{#if (if_equal content_type "message")}}
    {{ text }}
  {{/if}}

  {{#if (if_equal content_type "image")}}
    <img src="{{ text }}" style="max-width: 100%; max-height: 100%;" alt="Picture">
  {{/if}}

  <div class="messages__message-time">{{ time }}</div>


`;
