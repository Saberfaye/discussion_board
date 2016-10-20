var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new mongoose.Schema({
	content: {
		type: String,
		required: [true, "Post content is required"]
	},
	up_vote: { type: Number },
	down_vote: { type: Number },
	_user: { type: Schema.Types.ObjectId, ref: 'User' },
	_topic: { type: Schema.Types.ObjectId, ref: 'Topic' },
	comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
}, {timestamps: true});

var Post = mongoose.model('Post', PostSchema);