import { GraphQLSchema } from "graphql";
import { mutationType } from "./mutationType";
import { QueryType } from "./queryType";

export default new GraphQLSchema({
  mutation: mutationType,
  query: QueryType,
})