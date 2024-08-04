import { FormValues } from './types';

export const mapServerDataToFormValues = (data: any): FormValues => ({
  ...data,
  birthDate: new Date(data.birthDate),
});
