import { alertRepository } from '../repositories/alert.repository.js';
import { assetRepository } from '../repositories/asset.repository.js';
import { AppError } from '../utils/AppError.js';

const ensureAssetExists = async (assetId) => {
  const asset = await assetRepository.findById(assetId);

  if (!asset) {
    throw new AppError('Asset not found.', 404);
  }
};

const ensureAlertOwnership = (alert, userId) => {
  if (!alert) {
    throw new AppError('Alert not found.', 404);
  }

  if (alert.userId !== userId) {
    throw new AppError('You can only access your own alerts.', 403);
  }
};

export const alertService = {
  getUserAlerts(userId) {
    return alertRepository.findAllByUser(userId);
  },

  async getAlertById(id, userId) {
    const alert = await alertRepository.findById(id);
    ensureAlertOwnership(alert, userId);
    return alert;
  },

  async createAlert(userId, data) {
    await ensureAssetExists(data.assetId);

    return alertRepository.create({
      userId,
      assetId: data.assetId,
      targetPrice: data.targetPrice,
      condition: data.condition,
      isActive: data.isActive ?? true
    });
  },

  async updateAlert(id, userId, data) {
    const alert = await alertRepository.findById(id);
    ensureAlertOwnership(alert, userId);

    if (data.assetId) {
      await ensureAssetExists(data.assetId);
    }

    return alertRepository.update(id, data);
  },

  async deleteAlert(id, userId) {
    const alert = await alertRepository.findById(id);
    ensureAlertOwnership(alert, userId);
    return alertRepository.delete(id);
  }
};
