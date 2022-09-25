import UserRepository from '@modules/users/infra/database/UserRepository';
import { CreateUserResolver } from './createUserResolver';
import { CreateUserUseCase } from './createUserUseCase';

const userRepo = new UserRepository();
const useCase = new CreateUserUseCase(userRepo);
const resolver = new CreateUserResolver(useCase);

export { useCase as createUserUseCase, resolver as createUserResolver };
