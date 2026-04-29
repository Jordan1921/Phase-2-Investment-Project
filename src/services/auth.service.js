import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { userRepository } from '../repositories/user.repository.js';
import { AppError } from '../utils/AppError.js';

const SALT_ROUNDS = 10;

const signToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role
    },
    process.env.JWT_SECRET || 'munyun',
    { expiresIn: '1d' }
  );
};

export const authService = {
  async signup({ email, password }) {
    const existingUser = await userRepository.findByEmail(email);

    if (existingUser) {
      throw new AppError('Email is already registered.', 409);
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await userRepository.create({
      email,
      password: hashedPassword,
      role: 'user'
    });

    return {
      user,
      token: signToken(user)
    };
  },

  async login({ email, password }) {
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Invalid email or password.', 401);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new AppError('Invalid email or password.', 401);
    }

    const safeUser = {
      id: user.id,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt
    };

    return {
      user: safeUser,
      token: signToken(user)
    };
  }
};
