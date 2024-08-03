import dayjs from 'dayjs';

export const INIT_VALUES = {
  fullName: 'Иванов Иван Иванович',
  birthDate: dayjs('1990-01-01'),
  experience: 10,
  position: 'Менеджер по работе с клиентами',
  username: 'ivanov',
  password: '',
  email: 'ivanov@example.com',
  phoneNumber: '+7 777 777 77 77',
  notes: 'Это примечание.',
};

export const POSITIONS = [
  'Менеджер по работе с клиентами',
  'Специалист тех. поддержки',
  'Директор',
];
