import UserRepository from '@modules/users/infra/database/UserRepository';
import { RemoveUserResolver } from './removeUserResolver';
import { RemoveUserUseCase } from './removeUserUseCase';

const userRepo = new UserRepository();
const useCase = new RemoveUserUseCase(userRepo);
const resolver = new RemoveUserResolver(useCase);

export { useCase as removeUserUseCase, resolver as removeUserResolver };
