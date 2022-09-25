import bcrypt from 'bcryptjs';
import { Failable } from '@shared/logic/Result';
import { GuardClauses } from '@shared/logic/GuardClauses';

interface IUserPasswordProps {
  value: string;
  hashed?: boolean;
}

export class UserPassword {
  props: IUserPasswordProps;

  private constructor(props: IUserPasswordProps) {
    this.props = props;
  }

  value(): string {
    return this.props.value;
  }

  public isAlreadyHashed(): boolean {
    if (!this.props.hashed) return false;
    return true;
  }

  public async comparePassword(stringPassword: string): Promise<boolean> {
    let hashed: string;

    if (this.isAlreadyHashed()) {
      hashed = this.props.value;

      return bcrypt.compare(stringPassword, hashed);
    }

    return this.props.value === stringPassword;
  }

  public async getHashedValue(): Promise<string> {
    if (this.isAlreadyHashed()) {
      return this.props.value;
    }

    return bcrypt.hash(this.props.value, 8);
  }

  public static create(
    { value, hashed }: IUserPasswordProps,
  ): Failable<UserPassword, string> {
    const argument = GuardClauses.VerifyNullOrUndefined(value, 'passowrd');

    if (!argument.succeeded) {
      return { isError: true, error: 'Field: Password invalid'};
    }
    const password = new UserPassword({ value, hashed });
    return { isError: false, value: password };

  }
}
