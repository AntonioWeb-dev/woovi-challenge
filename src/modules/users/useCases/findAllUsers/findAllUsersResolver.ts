import { BaseResolver } from '@shared/infra/BaseResolver';
import { FindAllUsersUseCase } from './FindAllUsersUseCase';
import { IFindAllUsersResponseDTO } from './IFindAllUsersDTO';

export class FindAllUsersResolver extends BaseResolver<null, IFindAllUsersResponseDTO[]> {
  private useCase: FindAllUsersUseCase;

  constructor(useCase: FindAllUsersUseCase) {
    super();
    this.useCase = useCase;
  }

  async queryExecuter() {
    const result = await this.useCase.execute();
    if (result.isError) {
      return this.responseError(result.error);
    }
    return { data: result.value, error: '' };
  }
}
