import { gql, ApolloServer, UserInputError } from 'apollo-server';
import './db/db.js';
import Organization from './models/Organization.js';
import User from './models/User.js';
import Preference from './models/Preference.js';

const typeDefs = gql`
	enum YesNo {
		YES
		NO
	}
	type Summary {
		name: String!
		level_cohesion: Int!
	}
	type Organization {
		name: String!
		phone: String
		city: String!
		id: ID!
		summary: Summary
	}

	type Preference {
		name: String!
		id: ID!
	}

	type User {
		username: String!
		phone: String
		city: String!
		suggestions: [Preference]!
		id: ID!
	}

	type Token {
		value: String!
	}

	type Query {
		organizationCount: Int!
		allOrganizations(phone: YesNo): [Organization]!
		findOrganization(name: String!): Organization
		me: User
	}

	type Mutation {
		addOrganization(
			name: String!
			phone: String
			city: String!
		): Organization
		editNumber(name: String!, phone: String!): Organization
		createUser(username: String!): User
		login(username: String!, password: String!): Token
	}
`;

const resolvers = {
	Query: {
		organizationCount: () => Organization.collection.countDocuments(),
		allOrganizations: async (_root, args) => {
			if (!args.phone) return Organization.find({});
			return Organization.find({
				phone: { $exists: args.phone === 'YES' },
			});
		},
		findOrganization: (_root, args) => {
			const { name } = args;
			return Organization.findOne({ name });
		},
	},
	Mutation: {
		addOrganization: (_root, args) => {
			const organization = new Organization({ ...args });
			try {
				organization.save();
			} catch (e) {
				throw new UserInputError(e.message, {
					invalidArgs: args,
				});
			}
		},
		editNumber: async (_root, args) => {
			const organization = await Organization.findOne({
				name: args.name,
			});
			if (!organization) return;
			organization.phone = args.phone;

			try {
				organization.save();
			} catch (e) {
				throw new UserInputError(e.message, {
					invalidArgs: args,
				});
			}
		},
	},
	Organization: {
		summary: root => {
			return {
				name: root.name,
				level_cohesion: root.level_cohesion,
			};
		},
	},
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

apolloServer.listen().then(({ url }) => {
	console.log(`Server on port ${url}`);
});
