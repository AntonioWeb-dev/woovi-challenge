import { IUserRepo } from '@modules/users/repositories/IUserRepo';
import { CreateUserUseCase } from './createUserUseCase';

describe('Test createUserUseCase', () => {
  const userRepoMock = {
    create: jest.fn(),
    findByFilter: jest.fn(),
  } as unknown as IUserRepo;
  const userDTO = {
      name: 'Bruno',
      email: 'novo@gmail.com',
      password: '8ajda9djad90KLAd',
      phoneNumber: '98998902831',
      cpf: '00000000090'
  }
  const createUserUseCase = new CreateUserUseCase(userRepoMock);
  it('should create an user', async () => {
    jest.spyOn(userRepoMock, 'findByFilter')
      .mockResolvedValue(Promise.resolve([]))
  
    const result = await createUserUseCase.execute(userDTO);
    expect(result.isError).toBeFalsy();
    expect(userRepoMock.create).toHaveBeenCalled();
    expect(userRepoMock.findByFilter).toHaveBeenCalledTimes(3);
  });
});
