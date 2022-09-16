import { UserEmail } from '../ValuesObject/UserEmail';
import { UserPassword } from '../ValuesObject/UserPassword';
import { UserPhone } from '../ValuesObject/UserPhone';
import { UserPixKey } from '../ValuesObject/UserPixKey';

export enum KindKeys { 'RANDOM', 'CPF', 'EMAIL', 'PHONE_NUMBER' };

export type TypePixKeys = {
  kind: KindKeys,
  actived: boolean,
  key?: string,
  created_at?: Date;
  updated_at?: Date;
}

export interface IUserProps {
  name: string;
  email: UserEmail;
  password: UserPassword;
  phoneNumber: UserPhone;
  cpf: string;
  pixKeys: UserPixKey[]; 
  balance: Number;
  created_at?: Date;
  updated_at?: Date;
}
