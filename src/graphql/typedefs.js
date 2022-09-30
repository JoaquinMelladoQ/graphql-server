import { gql } from 'apollo-server';

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

export default typeDefs;
