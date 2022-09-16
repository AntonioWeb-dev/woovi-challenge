import { AggregateRoot } from '@shared/domain/AggregateRoot';
import { GuardClauses } from '@shared/logic/GuardClauses';
import { Failable } from '@shared/logic/Result';
import { UserCreatedEvent } from './events/UserCreated';
import { IUserProps } from './interface/IUserProps';
import { UserEmail } from './ValuesObject/UserEmail';
import { UserPassword } from './ValuesObject/UserPassword';
import { UserPhone } from './ValuesObject/UserPhone';
import { UserPixKey } from './ValuesObject/UserPixKey';

export class User extends AggregateRoot<IUserProps> {
  constructor(props: IUserProps, id?: string) {
    super(props, id);
  }

  public get name(): string {
    return this.props.name;
  }

  public get cpf(): string {
    return this.props.cpf;
  }

  public get pixKeys(): UserPixKey[] {
    return this.props.pixKeys;
  }

  public get email(): UserEmail {
    return this.props.email;
  }

  public get password(): UserPassword {
    return this.props.password;
  }

  public get phoneNumber(): UserPhone {
    return this.props.phoneNumber;
  }

  public get balance(): Number {
    return this.props.balance;
  }

  public get created_at(): Date {
    return this.props.created_at || new Date();
  }

  public get updated_at(): Date {
    return this.props.updated_at || new Date();
  }

  public addPixKey(pixKey: UserPixKey): void {
    this.props.pixKeys.push(pixKey);
  }

  public setName(name: string): void {
    this.props.name = name;
  }

  public setEmail(email: UserEmail): void {
    this.props.email = email;
  }

  public setPassword(password: UserPassword): void {
    this.props.password = password;
  }

  public setPhoneNumber(phoneNumber: UserPhone): void {
    this.props.phoneNumber = phoneNumber;
  }

  public static build(
    props: IUserProps,
    id?: string,
  ): Failable<User, string> {
    const propsCannotBeNull = [
      { fieldValue: props.name, fieldName: 'name' },
      { fieldValue: props.email, fieldName: 'email' },
      { fieldValue: props.password, fieldName: 'password' },
      { fieldValue: props.phoneNumber, fieldName: 'phoneNumber' },
      { fieldValue: props.cpf, fieldName: 'cpf' },
    ];

    const guardResult = GuardClauses.VerifyNullOrUndefinedArray(propsCannotBeNull);
    if (!guardResult.succeeded) {
      return { isError: true, error: `Field: ${guardResult.message}`};
    }
    const propsUser = {
      ...props,
      pixKeys: props.pixKeys || [],
      balance: props.balance || 0,
    };
    const user = new User(propsUser, id);
    if (!id) {
      user.addDomainEvent(new UserCreatedEvent(user));
    }
    return { isError: false, value: user };
  }
}
