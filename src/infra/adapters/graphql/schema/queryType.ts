import { UserQuery, UsersQuery } from "@modules/users/infra/graphql/queries";
import { GraphQLObjectType } from "graphql";

export const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user: UserQuery,
    users: UsersQuery,
  },
});
