import { portfolioService } from '../services/portfolio.service.js';

export const portfolioController = {
  async getPortfolio(req, res) {
    const portfolio = await portfolioService.getUserPortfolio(req.user.id);
    res.status(200).json(portfolio);
  },

  async createPortfolioEntry(req, res) {
    const portfolio = await portfolioService.createPortfolioEntry(req.user.id, req.body);
    res.status(201).json(portfolio);
  },

  async getPortfolioEntryById(req, res) {
    const portfolio = await portfolioService.getPortfolioEntryById(Number(req.params.id), req.user.id);
    res.status(200).json(portfolio);
  },

  async updatePortfolioEntry(req, res) {
    const portfolio = await portfolioService.updatePortfolioEntry(Number(req.params.id), req.user.id, req.body);
    res.status(200).json(portfolio);
  },

  async deletePortfolioEntry(req, res) {
    await portfolioService.deletePortfolioEntry(Number(req.params.id), req.user.id);
    res.status(204).send();
  }
};
