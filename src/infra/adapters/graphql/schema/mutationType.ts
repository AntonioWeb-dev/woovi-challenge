import { CreateUserMutation } from "@modules/users/infra/graphql/mutation/CreateUserMutation";
import { UpdateUserMutation } from "@modules/users/infra/graphql/mutation/UpdateUserMutation";
import { RemoveUserMutation } from "@modules/users/infra/graphql/mutation/RemoveUserMutation";
import { GraphQLObjectType } from "graphql";


export const mutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    CreateUserMutation,
    UpdateUserMutation,
    RemoveUserMutation
  })
})