import bcrypt from 'bcryptjs';
import User from '../models/User';
import { ResolverMap } from 'src/types/graphql-utils';
import { UserInputError } from 'apollo-server-express';
import {
  validateUserLoginInput,
  validateUserRegistrationInput,
} from '../utils/validators';
import { generateProfilePicture, generateToken } from '../utils/helpers';

const usersResolvers: ResolverMap = {
  Query: {
    getProfilePicture: async (_, { username }) => {
      try {
        const user = await User.findOne({ username });
        if (user) return user.profilePicture;
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
  },
};

export default usersResolvers;
