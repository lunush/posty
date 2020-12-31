import postsResolvers from './posts';
import usersResolvers from './users';

const resolvers = {
  Post: {
    likeCount: (parent: any) => parent.likes.length,
    commentCount: (parent: any) => parent.comments.length,
  },
  Comment: {
    likeCount: (parent: any) => parent.likes.length,
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
