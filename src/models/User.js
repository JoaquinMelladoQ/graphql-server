import mongoose from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';

const schema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		minLength: 3,
	},
	phone: {
		type: String,
		minLength: 5,
	},
	city: {
		type: String,
		required: true,
		minLength: 3,
	},
	suggestions: [
		{
			ref: 'Preference',
			type: mongoose.Schema.Types.ObjectID,
		},
	],
});

schema.plugin(mongooseUniqueValidator);

export default mongoose.model('User', schema);
