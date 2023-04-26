import * as yup from 'yup';

export const vehiclesSchema = yup
  .object({
    brand: yup
      .string()
      .required()
      .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field '),
    model: yup.string().required(),
    year: yup
      .string()
      .required()
      .matches(/^[0-9]+$/, 'Must be only digits')
      .min(4, 'Must be exactly 4 digits')
      .max(4, 'Must be exactly 4 digits'),
    mileage: yup
      .string()
      .required()
      .matches(/^[0-9]+$/, 'Must be only digits'),
    price: yup
      .string()
      .required()
      .matches(/^[0-9]+$/, 'Must be only digits'),
  })
  .required();

export const userSchema = yup.object({
  username: yup
    .string()
    .required()
    .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field '),
  email: yup.string().email(),
});

export const phoneNumberValidator = (phone: string): string => {
  if (!phone || phone.length <= 0) return 'Phone number cannot be empty.';
  return '';
};

export const codeValidator = (code: string): string => {
  if (!code || code.length <= 0) return 'Code cannot be empty.';
  if (!code || code.length < 6) return 'Code should contain 6 numbers';
  return '';
};

export const nameValidator = (name: string): string => {
  if (!name || name.length <= 0) return 'Name cannot be empty.';

  return '';
};
