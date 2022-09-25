import { IUserRepo } from '@modules/users/repositories/IUserRepo';
import { Failable } from '@shared/logic/Result';
import { IRemoveUserRequestDTO } from './IRemoveUserDTO';

type Response = Failable<null, string>;

export class RemoveUserUseCase {
  userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  async execute(args: IRemoveUserRequestDTO): Promise<Response> {

    try {
      const user = await this.userRepo.findById(args.id);
      if (!user) {
        return { isError: true, error: `User not found` };
      }
      await this.userRepo.remove(args.id);
      return { isError: false, value: null };
    } catch (err) {
      return { isError: true, error: `Server error: unexpected error` };
    }
  }
}
