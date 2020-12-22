import bcrypt from 'bcryptjs';
import User from '../models/User';
import { ResolverMap } from 'src/types/graphql-utils';
import { UserInputError } from 'apollo-server-express';
import {
  validateUserLoginInput,
  validateUserRegistrationInput,
} from '../utils/validators';
import { createTokenCookie, generateToken } from '../utils/helpers';

const usersResolvers: ResolverMap = {
  Mutation: {
    register: async (_, { username, password }, context) => {
      const { isValid, errors } = validateUserRegistrationInput(
        username,
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
        password: hashedPassword,
      });

      await user.save();
      const token = generateToken(user);
      createTokenCookie(token, context);

      return token;
    },
    login: async (_, { username, password }, context) => {
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
      createTokenCookie(token, context);

      return token;
    },
  },
};

export default usersResolvers;
