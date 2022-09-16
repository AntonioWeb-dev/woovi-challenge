import { Failable } from '@shared/logic/Result';

export class UserPhone {
  value: string;

  private constructor(props: string) {
    this.value = props;
  }

  public get stateCode(): string {
    return this.value.slice(0, 2);
  }

  public number(): string {
    return this.value.slice(2);
  }

  public phoneNumber(): string {
    return this.value;
  }

  public static validateNumber(phoneNumber: string): boolean {
    return phoneNumber.length === 11;
  }

  public static create(phoneNumberText: string): Failable<UserPhone, string> {
    if (!UserPhone.validateNumber(phoneNumberText)) {
      return { isError: true, error: `PhoneNumber: invalid` };
    }
    const phoneNumber = new UserPhone(phoneNumberText)
    return { isError: false, value: phoneNumber };
  }
}
