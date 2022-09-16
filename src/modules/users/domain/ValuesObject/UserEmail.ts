import { Failable } from '@shared/logic/Result';

interface IUserEmailProps {
  value: string;
}

export class UserEmail {
  props: IUserEmailProps;

  private constructor(props: IUserEmailProps) {
    this.props = props;
  }

  private static isValidEmail(email: string): boolean {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  }

  private static format(email: string): string {
    return email.trim().toLowerCase();
  }

  public value(): string {
    return this.props.value;
  }

  public static create(email: string): Failable<UserEmail, string> {
    if (!this.isValidEmail(email)) {
      return { isError: true, error: 'Field: Email invalid'};
    }
    const emailInstance = new UserEmail({ value: email });
    return { isError: false, value: emailInstance };
  }
}
