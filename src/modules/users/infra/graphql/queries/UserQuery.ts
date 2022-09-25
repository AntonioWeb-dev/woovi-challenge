import { findUserUseCase } from '@modules/users/useCases/findUser';
import {GraphQLString} from 'graphql';
import { UserType } from '../types/UserType';

type Input = {
  id: string,
};

const UserQuery = {
  type: UserType,
  args: {
    id: {type: GraphQLString},
  },
  resolve: async (root: {}, { id }: Input) => {
    const result = await findUserUseCase.execute({ id });
    if (result.isError) {
      return null
    }

    return result.value
  },
};

export {UserQuery};
