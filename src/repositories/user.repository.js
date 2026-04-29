import { prisma } from '../utils/prisma.js';

export const userRepository = {
  findByEmail(email) {
    return prisma.user.findUnique({
      where: { email }
    });
  },

  findById(id) {
    return prisma.user.findUnique({
      where: { id }
    });
  },

  create(data) {
    return prisma.user.create({
      data,
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true
      }
    });
  }
};
