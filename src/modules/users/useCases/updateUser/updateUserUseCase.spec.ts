import { User } from "@modules/users/domain/User";
import { UserEmail } from "@modules/users/domain/ValuesObject/UserEmail";
import { UserPassword } from "@modules/users/domain/ValuesObject/UserPassword";
import { UserPhone } from "@modules/users/domain/ValuesObject/UserPhone";
import { IUserRepo } from "@modules/users/repositories/IUserRepo";
import { Result } from "@shared/logic/Result";
import { UpdateUserUseCase } from "./updateUserUseCase";

describe('Update User', () => {

  const userPhone = UserPhone.create('98998902831');
    const userEmail = UserEmail.create('example@gmail.com');
    const userPassword = UserPassword.create({ value: '12345678' })
    if (userPhone.isError || userPassword.isError || userEmail.isError) throw new Error('error');
    const user = User.build({
      name: 'antonio',
      email:userEmail.value,
      password: userPassword.value,
      phoneNumber: userPhone.value,
      cpf: '00000000090',
      pixKeys: [],
      balance: 50,
    }, '62d45800fc13ae26fc0005aa') as any as Result<User>;

  const userRepoMock = {
    create: jest.fn(),
    update: jest.fn(),
    findById: jest.fn(),
    findByFilter: async () => Promise.resolve([]),
  } as unknown as IUserRepo;

  const updateUserUseCase = new UpdateUserUseCase(userRepoMock);
  it('should update user', async () => {
    const argsToUpdateUser = {
      id: '62d45800fc13ae26fc0005aa',
      name: 'Nevin',
      email: 'bruno1@example.com',
      phoneNumber: '98998902831',

    };
    jest.spyOn(userRepoMock, 'update');
    jest.spyOn(userRepoMock, 'findById')
      .mockResolvedValue(Promise.resolve(user.value));
      
    await updateUserUseCase.execute(argsToUpdateUser);
    expect(userRepoMock.update).toHaveBeenCalledWith('62d45800fc13ae26fc0005aa', {
      name: 'Nevin',
      email: 'bruno1@example.com',
      phoneNumber: '98998902831',
    });
  });
  it('should not update an user', async () => {
    const argsToUpdateUser = {
      id: '62d45800fc13ae26fc0005aa',
      name: 'bruno',
      email: 'bruno1email',
    };
    jest.spyOn(userRepoMock, 'update');
    const result = await updateUserUseCase.execute(argsToUpdateUser);
    if (!result.isError) throw new Error('error');
    const err = result.error;
    expect(err).toBe('Field: Email invalid');
  });
});