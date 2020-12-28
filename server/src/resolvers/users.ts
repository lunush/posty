import bcrypt from 'bcryptjs';
import User from '../models/User';
import { ResolverMap } from 'src/types/graphql-utils';
import { AuthenticationError, UserInputError } from 'apollo-server-express';
import {
  validateUserLoginInput,
  validateUserRegistrationInput,
} from '../utils/validators';
import {
  checkAuth,
  generateProfilePicture,
  generateToken,
} from '../utils/helpers';
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';

const usersResolvers: ResolverMap = {
  Query: {
    getUser: async (_, { username }) => {
      try {
        const user = await User.findOne({ username });
        if (user) return user;
        else throw new Error('User not found');
      } catch (e) {
        throw new Error(e);
      }
    },
  },
  Mutation: {
    register: async (_, { username, name, password }) => {
      const { isValid, errors } = validateUserRegistrationInput(
        username,
        name,
        password
      );

      if (!isValid)
        throw new UserInputError('Bad credentials', {
          errors,
        });

      const doesUserExist = await User.findOne({ username });
      if (doesUserExist)
        throw new UserInputError('Username is taken', {
          errors: {
            username: 'This username is taken',
          },
        });

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = new User({
        username,
        name,
        password: hashedPassword,
        profilePicture: await generateProfilePicture(),
      });

      await user.save();
      const token = generateToken(user);

      return token;
    },
    login: async (_, { username, password }) => {
      const { isValid, errors } = validateUserLoginInput(username, password);

      if (!isValid)
        throw new UserInputError('Bad credentials', {
          errors,
        });

      const user = await User.findOne({ username });
      if (!user)
        throw new UserInputError('Username is taken', {
          errors: {
            username: 'This username is taken',
          },
        });

      const isCorrectPassword = await bcrypt.compare(password, user.password);

      if (!isCorrectPassword)
        throw new UserInputError('Bad credentials', {
          errors: 'Bad credentials',
        });

      const token = generateToken(user);

      return token;
    },
    generateNewProfilePicture: async (
      _: any,
      __: any,
      context: ExpressContext
    ) => {
      try {
        const decryptedToken = checkAuth(context);
        const user = await User.findById(decryptedToken.id);
        if (!user) throw new AuthenticationError("You can't do that");

        const newProfilePicture = await generateProfilePicture();
        user!.profilePicture = newProfilePicture;
        await user.save();
        return newProfilePicture;
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};

export default usersResolvers;
