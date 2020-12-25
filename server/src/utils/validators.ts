interface ErrorObject {
  [key: string]: any;
}

export const validatePassword = (password: string, errors: ErrorObject) => {
  if (password.trim() === '') errors.password = 'Password must not be empty';
  return errors;
};

export const validateUsername = (username: string, errors: ErrorObject) => {
  if (username.trim() === '') errors.username = 'Username must not be empty';
  return errors;
};

export const validateName = (name: string, errors: ErrorObject) => {
  if (name.trim() === '') errors.username = 'Name must not be empty';
  return errors;
};

export const validateUserRegistrationInput = (
  username: string,
  name: string,
  password: string
) => {
  const errors: ErrorObject = {};

  validateUsername(username, errors);
  validateName(name, errors);
  validatePassword(password, errors);

  return {
    errors,
    isValid: Object.keys(errors).length < 1,
  };
};

export const validateUserLoginInput = (username: string, password: string) => {
  const errors: ErrorObject = {};

  validatePassword(password, errors);
  validateUsername(username, errors);

  return {
    errors,
    isValid: Object.keys(errors).length < 1,
  };
};
