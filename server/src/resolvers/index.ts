import postsResolvers from './posts';
import usersResolvers from './users';

const resolvers = {
  Post: {
    likesCount: (parent: any) => parent.likes.length,
    commentsCount: (parent: any) => parent.comments.length,
  },
  Comment: {
    likesCount: (parent: any, { commentId }: { commentId: string }) => {
      const commentIndex = parent.comments.findIndex(
        (comment: any) => comment.id === commentId
      );
      return parent.comments[commentIndex].likes.length;
    },
  },
  Query: {
    ...usersResolvers.Query,
    ...postsResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
  },
};

export default resolvers;
