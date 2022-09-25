import { BaseResolver } from '@shared/infra/BaseResolver';
import { FindUserUseCase } from './FindUserUseCase';
import { IFindUserRequestDTO, IFindUserResponseDTO } from './IFindUserDTO';

export class FindUserResolver extends BaseResolver<IFindUserRequestDTO, IFindUserResponseDTO> {
  private useCase: FindUserUseCase;

  constructor(useCase: FindUserUseCase) {
    super();
    this.useCase = useCase;
  }

  async queryExecuter(data: IFindUserRequestDTO) {
    const result = await this.useCase.execute(data);
    if (result.isError) {
      return this.responseError(result.error);
    }
    return { data: result.value, error: '' };
  }
}
