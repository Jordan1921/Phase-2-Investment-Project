import { prisma } from '../utils/prisma.js';

const include = {
  asset: true
};

export const portfolioRepository = {
  findAllByUser(userId) {
    return prisma.portfolio.findMany({
      where: { userId },
      include,
      orderBy: { createdAt: 'desc' }
    });
  },

  findById(id) {
    return prisma.portfolio.findUnique({
      where: { id },
      include
    });
  },

  create(data) {
    return prisma.portfolio.create({
      data,
      include
    });
  },

  update(id, data) {
    return prisma.portfolio.update({
      where: { id },
      data,
      include
    });
  },

  delete(id) {
    return prisma.portfolio.delete({
      where: { id }
    });
  }
};
