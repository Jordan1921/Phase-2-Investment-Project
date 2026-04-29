import { authService } from '../services/auth.service.js';

export const authController = {
  async signup(req, res) {
    const result = await authService.signup(req.body);
    res.status(201).json(result);
  },

  async login(req, res) {
    const result = await authService.login(req.body);
    res.status(200).json(result);
  }
};
