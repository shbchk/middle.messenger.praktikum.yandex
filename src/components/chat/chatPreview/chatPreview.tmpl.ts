export const chatPreviewTemplate = `
<div class="chatlist__avatar-wrap">
  <img src="{{ avatar }}" class="chatlist__avatar" alt="Аватар: {{ title }}" />
</div>
<div class="chatlist__chat-preview">
  <div class="chatlist__chatheading">{{ title }}</div>
  <div class="chatlist__chattext">{{ content }}</div>
</div>
<div class="chatlist__time">{{ time }}</div>
{{#if unread_count}}
<div class="chatlist__newcount">{{ unread_count }}</div>
{{/if}}
`;
