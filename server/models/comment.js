var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new mongoose.Schema({
	content: {
		type: String,
		required: [true, "Comment content is required"]
	},
	_user: { type: Schema.Types.ObjectId, ref: 'User' },
	_post: { type: Schema.Types.ObjectId, ref: 'Post' }
}, {timestamps: true});

var Comment = mongoose.model('Comment', CommentSchema);