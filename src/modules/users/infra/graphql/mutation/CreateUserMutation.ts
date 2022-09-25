import { createUserResolver } from "@modules/users/useCases/createUser";
import { GraphQLBoolean, GraphQLNonNull, GraphQLString } from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";

export const CreateUserMutation = mutationWithClientMutationId({
  name: 'CreateUser',
  inputFields: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
    phoneNumber: {
      type: new GraphQLNonNull(GraphQLString),
    },
    cpf: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async ({ name, email, password, phoneNumber, cpf }, context) => {
    const result = await createUserResolver.queryExecuter({ name, email, password, phoneNumber, cpf });
    if (!result.data) {
      return {
        success: false,
        message: result.error,
      };
    }
    return {
      success: true,
      message: 'User created',
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