import { alertService } from '../services/alert.service.js';

export const alertController = {
  async getAlerts(req, res) {
    const alerts = await alertService.getUserAlerts(req.user.id);
    res.status(200).json(alerts);
  },

  async createAlert(req, res) {
    const alert = await alertService.createAlert(req.user.id, req.body);
    res.status(201).json(alert);
  },

  async getAlertById(req, res) {
    const alert = await alertService.getAlertById(Number(req.params.id), req.user.id);
    res.status(200).json(alert);
  },

  async updateAlert(req, res) {
    const alert = await alertService.updateAlert(Number(req.params.id), req.user.id, req.body);
    res.status(200).json(alert);
  },

  async deleteAlert(req, res) {
    await alertService.deleteAlert(Number(req.params.id), req.user.id);
    res.status(204).send();
  }
};
