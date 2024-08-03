import dayjs from 'dayjs';

export type FormValues = {
  fullName: string;
  birthDate: dayjs.Dayjs;
  experience?: number | null;
  position: string;
  username: string;
  password?: string;
  email: string;
  phoneNumber: string;
  notes?: string;
};
