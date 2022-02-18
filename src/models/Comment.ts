import mongoose from 'mongoose'

interface Comment extends mongoose.Document {
  date: {
    type: Date
    required: true
  }
  nick: {
    type: String
    required: true
  }
  body: {
    type: String
    required: true
  }
}

const CommentSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  nick: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
})

const CommentModel = mongoose.model<Comment>('comments', CommentSchema)
export { Comment, CommentSchema, CommentModel }
