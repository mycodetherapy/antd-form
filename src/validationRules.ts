import { Rule } from 'antd/es/form';
import dayjs from 'dayjs';

export const requiredRule = (message: string): Rule => ({
  required: true,
  message,
});

export const emailRule: Rule = {
  type: 'email',
  message: 'Некорректный формат email',
};

export const minLengthRule = (min: number, message: string): Rule => ({
  min,
  message,
});

export const maxLengthRule = (max: number, message: string): Rule => ({
  max,
  message,
});

export const birthDateRule: Rule = {
  required: true,
  message: 'Пожалуйста, выберите дату рождения',
};

export const experienceRule = (
  getFieldValue: (field: string) => any
): Rule => ({
  validator(_, value) {
    if (value !== undefined) {
      if (value > 100) {
        return Promise.reject(new Error('Стаж не может быть больше 100 лет'));
      }
      const birthDate = getFieldValue('birthDate');
      if (birthDate) {
        const age = dayjs().diff(dayjs(birthDate), 'year');
        if (value > age) {
          return Promise.reject(
            new Error('Стаж не может быть больше возраста')
          );
        }
      }
    }
    return Promise.resolve();
  },
});
