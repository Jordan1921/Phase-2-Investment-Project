import { assetRepository } from '../repositories/asset.repository.js';
import { AppError } from '../utils/AppError.js';

export const assetService = {
  getAllAssets() {
    return assetRepository.findAll();
  },

  async getAssetById(id) {
    const asset = await assetRepository.findById(id);

    if (!asset) {
      throw new AppError('Asset not found.', 404);
    }

    return asset;
  },

  async createAsset(data) {
    const existingAsset = await assetRepository.findBySymbol(data.symbol);

    if (existingAsset) {
      throw new AppError('Asset symbol already exists.', 409);
    }

    return assetRepository.create({
      ...data,
      symbol: data.symbol.toUpperCase()
    });
  },

  async updateAsset(id, data) {
    await this.getAssetById(id);

    if (data.symbol) {
      const existingAsset = await assetRepository.findBySymbol(data.symbol.toUpperCase());

      if (existingAsset && existingAsset.id !== id) {
        throw new AppError('Asset symbol already exists.', 409);
      }
    }

    return assetRepository.update(id, {
      ...data,
      symbol: data.symbol ? data.symbol.toUpperCase() : undefined
    });
  },

  async deleteAsset(id) {
    await this.getAssetById(id);
    return assetRepository.delete(id);
  }
};
