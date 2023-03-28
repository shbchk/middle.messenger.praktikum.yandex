export const messageTemplate = `


  {{#if (if_equal content_type "text")}}
    {{ content }}
  {{/if}}

  {{#if (if_equal content_type "image")}}
    <img src="{{ content }}" style="max-width: 100%; max-height: 100%;" alt="Picture">
  {{/if}}

  <div class="messages__message-time">{{ time }}</div>


`;
