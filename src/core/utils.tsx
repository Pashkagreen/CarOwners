export const phoneNumberValidator = (phone: string) => {
  const re = /\S+@\S+\.\S+/;

  if (!phone || phone.length <= 0) return 'Email cannot be empty.';
  return '';
};

export const codeValidator = (code: string) => {
  if (!code || code.length <= 0) return 'Code cannot be empty.';

  return '';
};

export const nameValidator = (name: string) => {
  if (!name || name.length <= 0) return 'Name cannot be empty.';

  return '';
};
