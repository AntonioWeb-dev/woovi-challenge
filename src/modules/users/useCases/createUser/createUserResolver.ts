import { BaseResolver } from '@shared/infra/BaseResolver';
import { CreateUserUseCase } from './createUserUseCase';
import { ICreateUserRequestDTO } from './ICreateUserDTO';

export class CreateUserResolver extends BaseResolver<ICreateUserRequestDTO, boolean> {
  private useCase: CreateUserUseCase;

  constructor(useCase: CreateUserUseCase) {
    super();
    this.useCase = useCase;
  }

  async queryExecuter(data: ICreateUserRequestDTO) {
    const result = await this.useCase.execute(data);
    if (result.isError) {
      return this.responseError(result.error);
    }
    return { data: true, error: '' };
  }
}
