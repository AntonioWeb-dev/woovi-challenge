import { IUserRepo } from '@modules/users/repositories/IUserRepo';
import { Failable } from '@shared/logic/Result';
import { IFindUserRequestDTO, IFindUserResponseDTO } from './IFindUserDTO';

type Response = Failable<IFindUserResponseDTO, string>;

export class FindUserUseCase {
  userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  async execute(args: IFindUserRequestDTO): Promise<Response> {

    try {
      const user = await this.userRepo.findById(args.id);
      if (!user) {
        return { isError: true, error: `User not found` };
      }
      const dataToReturn = {
        id: user.id,
        name: user.name,
        email: user.email.value(),
        password: user.password.value(),
        phoneNumber: user.phoneNumber.phoneNumber(),
        cpf: user.cpf,
        balance: user.balance,
        pixKeys: user.pixKeys.map((pixKey) => ({
          kind: pixKey.kind,
          actived: pixKey.actived,
          key: pixKey.key,
          created_at: pixKey.created_at,
          updated_at: pixKey.updated_at,
        })),
      }
      return { isError: false, value: dataToReturn };
    } catch (err) {
      return { isError: true, error: `Server error: unexpected error` };
    }
  }
}
