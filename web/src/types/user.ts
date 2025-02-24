import { University } from './university';

export interface User {
  id?: number;
  email: string;
  password: string;
  universities: University[];
}
