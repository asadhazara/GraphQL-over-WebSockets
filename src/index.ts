import { GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import { useServer } from "graphql-ws/lib/use/ws";
import { WebSocketServer } from "ws";

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    hello: {
      type: GraphQLString,
      resolve() {
        throw new Error("Something went wrong");
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: Query,
});

useServer(
  {
    schema,
    onError: () => {
      console.log("Error thrown");
    },
    onNext: () => {
      console.log("Result returned");
    },
  },
  new WebSocketServer({ port: 4000 })
);
