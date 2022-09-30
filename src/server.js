import { ApolloServer } from 'apollo-server';
import './db/db.js';
import resolvers from './graphql/resolvers.js';
import typeDefs from './graphql/typedefs.js';

const apolloServer = new ApolloServer({ typeDefs, resolvers });

apolloServer.listen().then(({ url }) => {
	console.log(`Server on port ${url}`);
});
