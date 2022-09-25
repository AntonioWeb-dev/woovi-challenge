import { UserEmail } from '@modules/users/domain/ValuesObject/UserEmail';
import { UserPhone } from '@modules/users/domain/ValuesObject/UserPhone';
import { IUserRepo } from '@modules/users/repositories/IUserRepo';
import { DomainEvents } from '@shared/domain/events/DomainEvents';
import { Failable } from '@shared/logic/Result';
import { IUpdateUserRequestDTO } from './IUpdateUserDTO';

type Response = Failable<null, string>;

export class UpdateUserUseCase {
  userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  async execute(args: IUpdateUserRequestDTO): Promise<Response> {
    const propsToUpdate = { ...args } as Partial<IUpdateUserRequestDTO>;

    const builder = {
      email: (props: any) => UserEmail.create(props),
      phoneNumber: (props: any) => UserPhone.create(props),
      name: (props: any) => ({ isError: false, value: props}),
    };
    try {
      const user = await this.userRepo.findById(args.id);
      if (!user) {
        return { isError: true, error: `User not found`};
      }

      const objToUpdate = {
        email: (email: UserEmail) => user.setEmail(email),
        phoneNumber: (phoneNumber: UserPhone) => user.setPhoneNumber(phoneNumber),
        name: (name: string) => user.setName(name),
      };

      for (const key in propsToUpdate) {
        const func = builder[key as keyof typeof builder];
        if (!func || args[key as keyof IUpdateUserRequestDTO] === undefined) continue;
        const result = func(propsToUpdate[key as keyof typeof builder]) as Failable<any, string>;
        if (result.isError) {
          const err = result.error;
          return { isError:true, error: err };
        }
        const value = result.value;
        objToUpdate[key as keyof typeof objToUpdate](value);
      }

      const emailAlreadyExists = await this.userRepo.findByFilter({ email: args.email });
      if (emailAlreadyExists.length > 0) {
        return { isError: true, error: `Email already exists`};
      }

      delete propsToUpdate.id
      await this.userRepo.update(user.id, propsToUpdate);
      return { isError: false, value: null };
    } catch (err) {
      console.log(err);
      return { isError: true, error: `Server error: unexpected error`};
    }
  }
}
