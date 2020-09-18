import { Dayjs } from 'dayjs';

export interface BirthdayItem {
  name: string;
  date: string | Dayjs;
}
