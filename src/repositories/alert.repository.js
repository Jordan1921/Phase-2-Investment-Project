import { prisma } from '../utils/prisma.js';

const include = {
  asset: true
};

export const alertRepository = {
  findAllByUser(userId) {
    return prisma.alert.findMany({
      where: { userId },
      include,
      orderBy: { createdAt: 'desc' }
    });
  },

  findById(id) {
    return prisma.alert.findUnique({
      where: { id },
      include
    });
  },

  create(data) {
    return prisma.alert.create({
      data,
      include
    });
  },

  update(id, data) {
    return prisma.alert.update({
      where: { id },
      data,
      include
    });
  },

  delete(id) {
    return prisma.alert.delete({
      where: { id }
    });
  }
};
