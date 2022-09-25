import { BaseResolver } from '@shared/infra/BaseResolver';
import { RemoveUserUseCase } from './removeUserUseCase';
import { IRemoveUserRequestDTO } from './IRemoveUserDTO';

export class RemoveUserResolver extends BaseResolver<IRemoveUserRequestDTO, boolean> {
  private useCase: RemoveUserUseCase;

  constructor(useCase: RemoveUserUseCase) {
    super();
    this.useCase = useCase;
  }

  async queryExecuter(data: IRemoveUserRequestDTO) {
    const result = await this.useCase.execute(data);
    if (result.isError) {
      return this.responseError(result.error);
    }
    return { data: true, error: '' };

  }
}
