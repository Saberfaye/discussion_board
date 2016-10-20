var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TopicSchema = new mongoose.Schema({
	category: {
		type: String,
		required: [true, "Category title is required"]
	},
	title: {
		type: String,
		required: [true, "Topic title is required"]
	},
	description: {
		type: String,
		required: [true, "Topic description is required"]
	},
	_user: { type: Schema.Types.ObjectId, ref: 'User' },
	posts: [{type: Schema.Types.ObjectId, ref: 'Post'}]
}, {timestamps: true});

var Topic = mongoose.model('Topic', TopicSchema);