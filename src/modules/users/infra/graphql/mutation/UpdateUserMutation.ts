import { updateUserResolver } from "@modules/users/useCases/updateUser";
import { GraphQLBoolean, GraphQLNonNull, GraphQLString } from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";

export const UpdateUserMutation = mutationWithClientMutationId({
  name: 'UpdateUser',
  inputFields: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
    name: {
      type: GraphQLString,
    },
    email: {
      type: GraphQLString,
    },
    phoneNumber: {
      type: GraphQLString,
    },
  },
  mutateAndGetPayload: async ({ name, email, phoneNumber, id }, context) => {
    const result = await updateUserResolver.queryExecuter({ name, email, phoneNumber, id });
    if (!result.data) {
      return {
        success: false,
        message: result.error,
      };
    }
    return {
      success: true,
      message: 'User updated',
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