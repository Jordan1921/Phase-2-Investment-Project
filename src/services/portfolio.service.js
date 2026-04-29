import { portfolioRepository } from '../repositories/portfolio.repository.js';
import { assetRepository } from '../repositories/asset.repository.js';
import { AppError } from '../utils/AppError.js';

const ensureAssetExists = async (assetId) => {
  const asset = await assetRepository.findById(assetId);

  if (!asset) {
    throw new AppError('Asset not found.', 404);
  }
};

const ensurePortfolioOwnership = (portfolio, userId) => {
  if (!portfolio) {
    throw new AppError('Portfolio entry not found.', 404);
  }

  if (portfolio.userId !== userId) {
    throw new AppError('You can only access your own portfolio entries.', 403);
  }
};

export const portfolioService = {
  getUserPortfolio(userId) {
    return portfolioRepository.findAllByUser(userId);
  },

  async getPortfolioEntryById(id, userId) {
    const portfolio = await portfolioRepository.findById(id);
    ensurePortfolioOwnership(portfolio, userId);
    return portfolio;
  },

  async createPortfolioEntry(userId, data) {
    await ensureAssetExists(data.assetId);

    return portfolioRepository.create({
      userId,
      assetId: data.assetId,
      quantity: data.quantity,
      buyPrice: data.buyPrice
    });
  },

  async updatePortfolioEntry(id, userId, data) {
    const portfolio = await portfolioRepository.findById(id);
    ensurePortfolioOwnership(portfolio, userId);

    if (data.assetId) {
      await ensureAssetExists(data.assetId);
    }

    return portfolioRepository.update(id, data);
  },

  async deletePortfolioEntry(id, userId) {
    const portfolio = await portfolioRepository.findById(id);
    ensurePortfolioOwnership(portfolio, userId);
    return portfolioRepository.delete(id);
  }
};
