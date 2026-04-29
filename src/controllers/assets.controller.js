import { assetService } from '../services/asset.service.js';

export const assetController = {
  async getAssets(req, res) {
    const assets = await assetService.getAllAssets();
    res.status(200).json(assets);
  },

  async createAsset(req, res) {
    const asset = await assetService.createAsset(req.body);
    res.status(201).json(asset);
  },

  async getAssetById(req, res) {
    const asset = await assetService.getAssetById(Number(req.params.id));
    res.status(200).json(asset);
  },

  async updateAsset(req, res) {
    const asset = await assetService.updateAsset(Number(req.params.id), req.body);
    res.status(200).json(asset);
  },

  async deleteAsset(req, res) {
    await assetService.deleteAsset(Number(req.params.id));
    res.status(204).send();
  }
};
