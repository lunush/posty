import { model, Schema, Document } from 'mongoose';

interface PostDocument extends Document {
  postBody: string;
  username: string;
  likes: {
    username: string;
  }[];
  comments: [
    {
      commentBody: string;
      username: string;
      likes: {
        username: string;
      }[];
    }
  ];
}

const postSchema = new Schema({
  postBody: { type: String, required: true },
  username: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: Date.now },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  likes: [
    {
      username: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  comments: [
    {
      commentBody: { type: String, required: true },
      username: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
      modifiedAt: { type: Date, default: Date.now },
      likes: [
        {
          username: { type: String, required: true },
          createdAt: { type: Date, default: Date.now },
        },
      ],
    },
  ],
});

export default model<PostDocument>('Post', postSchema);
