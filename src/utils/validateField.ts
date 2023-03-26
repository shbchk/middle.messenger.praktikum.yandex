const validateFieldContent = (
  fieldName: string,
  fieldValue: string,
): boolean => {
  switch (fieldName) {
    case 'first_name':
    case 'second_name':
      return /^[А-ЯЁA-Z][а-яёa-z]+(-[А-ЯЁA-Z][а-яёa-z]+)?$/.test(fieldValue);
    case 'login':
      return (
        !/^\d+$/.test(fieldValue) &&
        /^[a-zA-Z0-9][a-zA-Z0-9_-]{2,19}$/.test(fieldValue)
      );
    case 'email':
      return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        fieldValue,
      );
    case 'password':
      return /^(?=.*\d)(?=.*[A-Z])[^\s]{8,40}$/.test(fieldValue);
    case 'phone':
      return /^\+?\d{10,15}$/.test(fieldValue);
    case 'message':
      return fieldValue.trim().length > 0;
    default:
      throw new Error(`Unknown field name: ${fieldName}`);
  }
};

export const validateField = (event: Event): boolean => {
  if (event.type === 'submit') {
    const formData = new FormData(event.target as HTMLFormElement);
    let result = true;
    formData.forEach((val, key) => {
      if (!validateFieldContent(key, val.toString())) {
        result = false;
        document
          .querySelector(`[name="${key}"] ~ .modal__validation-error-message`)
          ?.classList.add('active');
        document
          .querySelector(`[name="${key}"]`)
          ?.classList.add('modal__input--error');
      }
    });
    return result;
  }

  const { name, value, id } = event.target as HTMLInputElement;
  const isValid = validateFieldContent(name, value);
  const targetInput = document.querySelector(`#${id}`);
  const errorMessageDiv = document.querySelector(
    `[for="${id}"] ~ .modal__validation-error-message`,
  );

  if (!isValid) {
    errorMessageDiv?.classList.add('active');
    targetInput?.classList.add('modal__input--error');
  } else {
    errorMessageDiv?.classList.remove('active');
    targetInput?.classList.remove('modal__input--error');
  }

  return isValid;
};
