import { User } from '@modules/users/domain/User';
import { UserEmail } from '@modules/users/domain/ValuesObject/UserEmail';
import { UserPassword } from '@modules/users/domain/ValuesObject/UserPassword';
import { UserPhone } from '@modules/users/domain/ValuesObject/UserPhone';
import { IUserRepo } from '@modules/users/repositories/IUserRepo';
import { DomainEvents } from '@shared/domain/events/DomainEvents';
import { GuardClauses } from '@shared/logic/GuardClauses';
import { Failable } from '@shared/logic/Result';
import { ICreateUserRequestDTO } from './ICreateUserDTO';

type Response = Failable<null, string>;

export class CreateUserUseCase {
  userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  async execute(args: ICreateUserRequestDTO): Promise<Response> {
    const propsCannotBeNull = [
      { fieldValue: args.email, fieldName: 'email' },
      { fieldValue: args.password, fieldName: 'password' },
      { fieldValue: args.phoneNumber, fieldName: 'phoneNumber' },
      { fieldValue: args.name, fieldName: 'name' },
    ];

    const guardResult = GuardClauses.VerifyNullOrUndefinedArray(propsCannotBeNull);
    if (!guardResult.succeeded) {
      return { isError: true, error: `Invalid field: ${guardResult.message}`};
    }
    try {
      const emailOrError = UserEmail.create(args.email);
      const passwordOrError = UserPassword.create({ value: args.password, hashed: false });
      const phoneNumberOrError = UserPhone.create(args.phoneNumber);
      if (emailOrError.isError || passwordOrError.isError || phoneNumberOrError.isError) {
        return { isError: true, error: `Invalid field: ${guardResult.message}`};
      }
      const userOrError = User.build({
        name: args.name,
        email: emailOrError.value,
        password: passwordOrError.value,
        phoneNumber: phoneNumberOrError.value,
        cpf: args.cpf,
        balance: 0,
        pixKeys: [],
      });
      if (userOrError.isError) {
        return { isError: true, error: `Create user error: ${userOrError.error}`};
      }
      const emailAlreadyExists = await this.userRepo.findByFilter({ email: args.email });
      if (emailAlreadyExists.length >= 1) {
        return { isError: true, error: `Email already exists`};
      }
      const phoneNumberAlreadyExists = await this.userRepo.findByFilter({ phoneNumber: args.phoneNumber });
      if (phoneNumberAlreadyExists.length >= 1) {
        return { isError: true, error: `Phonenumber already exists`};
      }
      const CpfAlreadyExists = await this.userRepo.findByFilter({ cpf: args.cpf });
      if (CpfAlreadyExists.length >= 1) {
        return { isError: true, error: `CPF already exists`};
      }
      const user = userOrError.value;
      await this.userRepo.create(user);
      // DomainEvents.dispatchEventsForAggregate(user.id);
      return { isError: false, value: null };
    } catch (err) {
      return { isError: true, error: `Server error: unexpected error`};
    }
  }
}
