import bcrypt from 'bcryptjs';
import User from '../models/User';
import { ResolverMap } from 'src/types/graphql-utils';
import { AuthenticationError, UserInputError } from 'apollo-server-express';
import {
  validateUserLoginInput,
  validateUserProfileInput,
  validateUserRegistrationInput,
} from '../utils/validators';
import {
  checkAuth,
  generateProfilePicture,
  generateToken,
} from '../utils/helpers';
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';
import Post from '../models/Post';

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

      const isCorrectPassword = await bcrypt.compare(password, user!.password);
      if (!isCorrectPassword)
        throw new UserInputError('Bad credentials', {
          errors: 'Bad credentials',
        });

      const token = generateToken(user!);

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

        user.profilePicture = newProfilePicture;
        user.modifiedAt = new Date();

        await user.save();
        return newProfilePicture;
      } catch (e) {
        throw new Error(e);
      }
    },
    updateUserProfile: async (_, args, context) => {
      const { isValid, errors } = validateUserProfileInput(
        args?.username,
        args?.name,
        args?.bio,
        args?.location
      );

      if (!isValid)
        throw new UserInputError('Bad credentials', {
          errors,
        });

      const decryptedToken = checkAuth(context);
      const user = await User.findById(decryptedToken.id);
      if (!user) throw new AuthenticationError("You can't do that");

      if (user.username !== args.username) {
        await Post.updateMany(
          { username: user.username },
          { $set: { username: args.username } }
        );
      }

      if (user.name !== args.name) {
        await Post.updateMany(
          { username: user.username },
          { $set: { name: args.name } }
        );
      }

      user.username = args.username ? args.username : user.username;
      user.name = args.name ? args.name : user.name;
      user.bio = args.bio ? args.bio : user.bio;
      user.location = args.location ? args.location : user.location;

      await user.save();
      const token = generateToken(user);

      return token;
    },
  },
};

export default usersResolvers;
