import { BaseResolver } from '@shared/infra/BaseResolver';
import { UpdateUserUseCase } from './updateUserUseCase';
import { IUpdateUserRequestDTO } from './IUpdateUserDTO';

export class UpdateUserResolver extends BaseResolver<IUpdateUserRequestDTO, boolean> {
  private useCase: UpdateUserUseCase;

  constructor(useCase: UpdateUserUseCase) {
    super();
    this.useCase = useCase;
  }

  async queryExecuter(data: IUpdateUserRequestDTO) {
    const result = await this.useCase.execute(data);
    if (result.isError) {
      return this.responseError(result.error);
    }
    return { data: true, error: '' };
  }
}
