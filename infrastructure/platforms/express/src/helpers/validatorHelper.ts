import validator from "validator";

export const isValidUUID = (id: string): boolean => {
  return validator.isUUID(id);
};

export const isValidEmail = (email: string): boolean => {
  return validator.isEmail(email);
};

export const isStrongPassword = (password: string): boolean => {
  return validator.isStrongPassword(password);
};