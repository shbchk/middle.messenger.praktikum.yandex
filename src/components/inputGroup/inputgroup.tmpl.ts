export const inputgroupTemplate: string = `<div class="modal__inputgroup">
  <input type="{{ inputType }}" name="{{ inputName }}" id="{{ inputId }}" class="modal__input modal__input--error" {{ inputRequired }} />
  <label for="{{ inputId }}" class="modal__float-placeholder">{{ inputLabel }}</label>
  <div class="modal__validation-error-message">{{ errorMessage }}</div>
</div>`;