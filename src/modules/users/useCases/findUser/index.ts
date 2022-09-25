import UserRepository from '@modules/users/infra/database/UserRepository';
import { FindUserResolver } from './findUserResolver';
import { FindUserUseCase } from './FindUserUseCase';

const userRepo = new UserRepository();
const useCase = new FindUserUseCase(userRepo);
const resolver = new FindUserResolver(useCase);

export { useCase as findUserUseCase, resolver as findUserResolver };
