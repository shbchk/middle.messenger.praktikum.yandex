export const profileRowTemplate = `<div class='profile__row'>
  <div class='profile__row-label'>{{rowLabel}}</div>
  <div class='profile__row-value'>
    <input name='{{rowInputName}}' placeholder='{{rowInputPlaceholder}}' value='{{rowInputValue}}' type='{{rowInputType}}' class='profile__row-value-input' {{rowInputDisabled}} />
  </div>
</div>`;
