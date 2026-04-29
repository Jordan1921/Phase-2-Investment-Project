import { prisma } from '../utils/prisma.js';

export const assetRepository = {
  findAll() {
    return prisma.asset.findMany({
      orderBy: { symbol: 'asc' }
    });
  },

  findById(id) {
    return prisma.asset.findUnique({
      where: { id }
    });
  },

  findBySymbol(symbol) {
    return prisma.asset.findUnique({
      where: { symbol }
    });
  },

  create(data) {
    return prisma.asset.create({
      data
    });
  },

  update(id, data) {
    return prisma.asset.update({
      where: { id },
      data
    });
  },

  delete(id) {
    return prisma.asset.delete({
      where: { id }
    });
  }
};
