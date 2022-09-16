import { User } from './User';
import { UserEmail } from './ValuesObject/UserEmail';
import { UserPassword } from './ValuesObject/UserPassword';
import { UserPhone } from './ValuesObject/UserPhone';

describe('Test Users class', () => {
  it('should create an user', () => {
    const userPhone = UserPhone.create('991202831');
    const userEmail = UserEmail.create('example@gmail.com');
    const userPassword = UserPassword.create({ value: '12345678' })
    if (userPhone.isError || userPassword.isError || userEmail.isError) throw new Error('error');
    const user = User.build({
      name: 'antonio',
      email:userEmail.value,
      password: userPassword.value,
      phoneNumber: userPhone.value,
      cpf: '62716198357',
      pixKeys: [],
      balance: 50,
    });
    if (user.isError) throw new Error('error');
    expect(user.value.name).toBe('antonio');
    expect(user.value.balance).toBe(50);
  });
});
