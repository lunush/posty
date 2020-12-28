import { checkAuth } from '../utils/helpers';
import Post from '../models/Post';
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';
import { AuthenticationError, UserInputError } from 'apollo-server-express';

const postsResolvers = {
  Query: {
    getPosts: async () => {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (e) {
        throw new Error(e);
      }
    },
    getPost: async (_: any, { postId }: { postId: string }) => {
      try {
        const post = await Post.findById(postId);
        if (post) return post;
        else throw new Error('Post not found');
      } catch (e) {
        throw new Error(e);
      }
    },
  },
  Mutation: {
    createPost: async (
      _: any,
      { postBody }: { postBody: string },
      context: ExpressContext
    ) => {
      if (postBody.trim() === '')
        throw new Error('Post body must not be empty');

      try {
        const decryptedToken = checkAuth(context);
        const post = new Post({
          postBody,
          user: decryptedToken.id,
          name: decryptedToken.name,
          username: decryptedToken.username,
        });

        await post.save();
        return true;
      } catch (e) {
        throw new Error(e);
      }
    },

    deletePost: async (
      _: any,
      { postId }: { postId: string },
      context: ExpressContext
    ) => {
      try {
        const decryptedToken = checkAuth(context);
        const post = await Post.findById(postId);

        if (post && decryptedToken.username === post.username)
          await Post.deleteOne({ _id: postId });
        else throw new AuthenticationError('Nice try. No.');

        return true;
      } catch (e) {
        throw new Error(e);
      }
    },

    createComment: async (
      _: any,
      { postId, commentBody }: { postId: string; commentBody: string },
      context: ExpressContext
    ) => {
      const { username, name } = checkAuth(context);

      if (commentBody.trim() === '')
        throw new UserInputError('Empty comment', {
          errors: {
            body: 'Comment body must not empty',
          },
        });

      const post = await Post.findById(postId);

      if (post) {
        post.comments.push({ commentBody, username, name, likes: [] });
      } else throw new UserInputError('WTF');

      await post.save();
      return true;
    },

    deleteComment: async (
      _: any,
      { postId, commentId }: { postId: string; commentId: string },
      context: ExpressContext
    ) => {
      const { username } = checkAuth(context);

      if (username) {
        const post = await Post.findById(postId);
        if (post) {
          const commentIndex = post.comments.findIndex(
            (comment: any) => comment.id === commentId
          );

          post.comments.splice(commentIndex, 1);
          await post.save();
        } else throw new UserInputError('Nice try, but not today.');
      } else throw new AuthenticationError('Not permitted');

      return true;
    },

    togglePostLike: async (
      _: any,
      { postId }: { postId: string },
      context: ExpressContext
    ) => {
      const { username } = checkAuth(context);
      if (!username) throw new AuthenticationError('Not permitted');
      const post = await Post.findById(postId);

      if (post) {
        if (post.likes.find((like) => like.username === username)) {
          post.likes = post.likes.filter((like) => like.username !== username);
        } else {
          post.likes.push({ username });
        }
        await post.save();
      } else throw new UserInputError('Nice try, but not today.');

      return post;
    },

    toggleCommentLike: async (
      _: any,
      { postId, commentId }: { postId: string; commentId: string },
      context: ExpressContext
    ) => {
      const { username } = checkAuth(context);
      if (!username) throw new AuthenticationError('Not permitted');

      const post = await Post.findById(postId);

      if (post) {
        const commentIndex = post.comments.findIndex(
          (comment: any) => comment.id === commentId
        );
        if (commentIndex >= 0) {
          if (
            post.comments[commentIndex].likes.find(
              (like) => like.username === username
            )
          ) {
            post.likes = post.likes.filter(
              (like) => like.username !== username
            );
          } else {
            post.likes.push({ username });
          }

          await post.save();
        } else throw new UserInputError('Nice try, but not today.');
      } else throw new UserInputError('Nice try, but not today.');

      return post;
    },
  },
};

export default postsResolvers;
