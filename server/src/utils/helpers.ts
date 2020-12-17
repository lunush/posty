import { AuthenticationError } from 'apollo-server-express';
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';
import jwt from 'jsonwebtoken';
import { UserDocument } from '../models/User';

export const generateToken = (user: UserDocument) => {
  return jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    'secret',
    { expiresIn: 60 * 60 * 24 }
  );
};

export const checkAuth = (context: ExpressContext): any => {
  const authHeader = context.req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split('Bearer ')[1];
    if (token) {
      try {
        const user = jwt.verify(token, 'secret');
        return user;
      } catch (e) {
        throw new AuthenticationError('Invalid token');
      }
    }
    throw new AuthenticationError('Invalid token');
  }
  throw new AuthenticationError('Invalid token');
};
