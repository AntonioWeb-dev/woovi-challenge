import { TypePixKeys } from "@modules/users/domain/interface/IUserProps";

export interface IFindUserRequestDTO {
  id: string;
}

export interface IFindUserResponseDTO {
  id: string;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  cpf: string;
  balance: number;
  pixKeys: TypePixKeys[],
}
