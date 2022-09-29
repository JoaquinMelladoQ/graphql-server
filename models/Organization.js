import mongoose from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';

const schema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
		minLength: 5
	},
	phone: { 
		type: String, 
		minLength: 5
	},
	city: {
		type: String,
		required: true,
		minLength: 3
	},
})

schema.plugin(mongooseUniqueValidator)

export default mongoose.model("Organization", schema)
