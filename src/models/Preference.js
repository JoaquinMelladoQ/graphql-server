import mongoose from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';

const schema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
});

schema.plugin(mongooseUniqueValidator);

export default mongoose.model('Preference', schema);
