import { User } from "../domain/User";
import { UserPixKey } from "../domain/ValuesObject/UserPixKey";

export interface IFilter {
  email?: string;
  phoneNumber?: string;
  cpf?: string;
}

export interface IUpdateProps {
  phoneNumber?: string
  pixKeys?: { kind: string, actived: boolean, key: string }[]
  balance?: Number;
}

export interface IUserRepo {
  findAll(): Promise<(User | undefined)[]>;
  findById(userId: string): Promise<User | undefined>;
  create(user: User): Promise<void>;
  update(id: string, userData: IFilter): Promise<void>;
  findByFilter(filter: IFilter): Promise<(User | undefined)[]>
}