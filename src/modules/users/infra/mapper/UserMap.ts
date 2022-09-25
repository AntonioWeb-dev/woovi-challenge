import { User } from "@modules/users/domain/User";
import { UserEmail } from "@modules/users/domain/ValuesObject/UserEmail";
import { UserPassword } from "@modules/users/domain/ValuesObject/UserPassword";
import { UserPhone } from "@modules/users/domain/ValuesObject/UserPhone";
import { UserPixKey } from "@modules/users/domain/ValuesObject/UserPixKey";

export class UserMap {
  public static toDomain(raw: any): User | undefined {
    const userEmail = UserEmail.create(raw.email);
    const userPassword = UserPassword.create({
      value: raw.password,
      hashed: true,
    });
    const userPhone = UserPhone.create(raw.phoneNumber);
    

    const userKeys = raw.pixKeys.map(
      (key: any) => UserPixKey.create(key),
    );
    if (userPhone.isError || userPassword.isError || userEmail.isError) throw new Error('error');
    
    const userOrError = User.build(
      {
        name: raw.name,
        email: userEmail.value,
        password: userPassword.value,
        phoneNumber: userPhone.value,
        cpf: raw.cpf,
        balance: raw.balance,
        pixKeys: userKeys,
        created_at: new Date(raw.created_at),
        updated_at: new Date(raw.updated_at),
      },
      raw._id,
    );

    if (userOrError.isError) {
      console.log(userOrError.error);
      return;
    }

    return userOrError.value;
  }

  public static async toPersistence(user: User): Promise<any> {
    return {
      name: user.name,
      email: user.email.value(),
      password: await user.password.getHashedValue(),
      balance: user.balance,
      phoneNumber: user.phoneNumber.value,
      cpf: user.cpf,
      pixKeys: user.pixKeys.map(pixKey => ({ kind: pixKey.kind, actived: pixKey.actived, key: pixKey.key })),
    };
  }
}