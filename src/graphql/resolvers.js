import Organization from '../models/Organization.js';
import { UserInputError } from 'apollo-server';

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

export default resolvers;
