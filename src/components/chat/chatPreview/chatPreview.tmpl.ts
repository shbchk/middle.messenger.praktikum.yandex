export const chatPreviewTemplate = `
<div class="chatlist__chat">
<div class="chatlist__avatar-wrap">
  <img src="{{ avatar }}" class="chatlist__avatar" alt="Аватар" />
</div>
<div class="chatlist__chat-preview">
  <div class="chatlist__chatheading">{{ displayName }}</div>
  <div class="chatlist__chattext">{{ message }}</div>
</div>
<div class="chatlist__time">{{ time }}</div>
{{#if newCount}}
<div class="chatlist__newcount">{{ newCount }}</div>
{{/#if}}
</div>
`;
