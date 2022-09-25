import { removeUserResolver } from "@modules/users/useCases/removeUser";
import { GraphQLBoolean, GraphQLNonNull, GraphQLString } from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";

export const RemoveUserMutation = mutationWithClientMutationId({
  name: 'RemoveUser',
  inputFields: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async ({ id }, context) => {
    const result = await removeUserResolver.queryExecuter({ id });
    if (!result.data) {
      return {
        success: false,
        message: result.error,
      };
    }
    return {
      success: true,
      message: 'User removed',
    };
  },
  outputFields: {
    success: {
      type: GraphQLBoolean,
      resolve: ({ success }) => success,
    },
    message: {
      type: GraphQLString,
      resolve: ({ message }) => message,
    },
  },
});