import UserRepository from '@modules/users/infra/database/UserRepository';
import { FindAllUsersResolver } from './findAllUsersResolver';
import { FindAllUsersUseCase } from './FindAllUsersUseCase';

const userRepo = new UserRepository();
const useCase = new FindAllUsersUseCase(userRepo);
const resolver = new FindAllUsersResolver(useCase);

export { useCase as findAllUsersUseCase, resolver as findAllUsersResolver };
