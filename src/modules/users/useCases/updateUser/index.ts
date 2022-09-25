import UserRepository from '@modules/users/infra/database/UserRepository';
import { UpdateUserResolver } from './updateUserResolver';
import { UpdateUserUseCase } from './updateUserUseCase';

const userRepo = new UserRepository();
const useCase = new UpdateUserUseCase(userRepo);
const resolver = new UpdateUserResolver(useCase);

export { useCase as updateUserUseCase, resolver as updateUserResolver };
