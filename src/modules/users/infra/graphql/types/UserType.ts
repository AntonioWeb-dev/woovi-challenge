import { GraphQLBoolean, GraphQLEnumType, GraphQLFloat, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { connectionDefinitions, globalIdField } from "graphql-relay";

const PixKeyGraphQLType = new GraphQLObjectType({
  name: 'pixKey',
  fields: () => ({
    kind: {
      type: new GraphQLEnumType({
        name: 'kind',
        values: {
          RANDOM: { value: 'RANDOM'},
          CPF: { value: 'CPF'},
          EMAIL: { value: 'EMAIL'},
          PHONE_NUMBER: { value: 'PHONE_NUMBER'},
        } 
      }),
    },
    email: { type: GraphQLString },
    actived: { type: GraphQLBoolean },
    key: { type: GraphQLString },
    created_at: { type: GraphQLString },
    updated_at: { type: GraphQLString },
  })
})

const UserType = new GraphQLObjectType({
  name: 'User',
  description: "User's type",
  fields: () => ({
    id: {
      type: GraphQLString,
      resolve: user => user.id,
    },
    name: {
      type: GraphQLString,
      resolve: user => user.name,
    },
    email: {
      type: GraphQLString,
      resolve: user => user.email,
    },
    password: {
      type: GraphQLString,
      resolve: user => user.password,
    },
    cpf: {
      type: GraphQLString,
      resolve: user => user.cpf,
    },
    phoneNumber: {
      type: GraphQLString,
      resolve: user => user.phoneNumber,
    },
    pixKeys: {
      type: new GraphQLList(PixKeyGraphQLType),
      resolve: user => user.pixKeys,
    },
    balance: {
      type: GraphQLFloat,
      resolve: user => user.balance,
    },
    created_at: {
      type: GraphQLString,
      resolve: user => user.created_at,
    },
    updated_at: {
      type: GraphQLString,
      resolve: user => user.updated_at,
    },
  })
})

const { connectionType: UserConnection, edgeType: UserEdge } = connectionDefinitions({
  nodeType: UserType
})

export {
  UserConnection,
  UserEdge,
  UserType,
  PixKeyGraphQLType,
}