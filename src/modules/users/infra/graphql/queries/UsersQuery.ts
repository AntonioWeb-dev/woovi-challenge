import { findAllUsersUseCase } from "@modules/users/useCases/findAllUsers";
import { GraphQLNonNull } from "graphql";
import { connectionArgs, ConnectionArguments, connectionFromArray } from "graphql-relay";
import { UserConnection } from "../types/UserType";

const UsersQuery = {
  type: new GraphQLNonNull(UserConnection),
  args: connectionArgs,
  resolve: async (_: any, args: ConnectionArguments) => {
    const result = await findAllUsersUseCase.execute();
    if (result.isError) {
      return {
        users: null,
        message: result.error
      }
    }

    return connectionFromArray(result.value, args);
  },
}

export {UsersQuery};
