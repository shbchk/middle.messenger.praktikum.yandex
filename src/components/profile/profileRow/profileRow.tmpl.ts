export const profileRowTemplate: string = `
  <div class='profile__row-label'>{{rowLabel}}</div>
  <div class='profile__row-value'>
    {{{ rowInput }}}
    <div class="modal__validation-error-message">{{ errorMessage }}</div>
  </div>
`;
