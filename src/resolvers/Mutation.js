/* eslint-disable import/extensions */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { APP_SECRET } from '../helpers.js';

const signup = async (parent, args, context) => {
  const password = await bcrypt.hash(args.password, 10);

  const user = await context.prisma.user.create({ data: { ...args, password } });

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return { token, user };
};

const login = async (parent, args, context) => {
  const user = await context.prisma.user.findUnique({ where: { email: args.email } });
  if (!user) {
    throw new Error('No such user found');
  }

  // 2
  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  // 3
  return {
    token,
    user,
  };
};

const post = async (parent, args, context) => {
  const { userId } = context;
  const response = await context.prisma.link.create({
    data: {
      url: args.url,
      description: args.description,
      postedBy: { connect: { id: userId } },
    },
  });
  return response;
};

export { signup, login, post };
