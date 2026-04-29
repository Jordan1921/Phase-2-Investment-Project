import { Router } from 'express';

import { portfolioController } from '../controllers/portfolio.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { validateRequest } from '../middleware/validation.middleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { idParamValidator } from '../validators/common.validators.js';
import { createPortfolioValidator, updatePortfolioValidator } from '../validators/portfolio.validators.js';

const router = Router();

router.use(authenticate);

router.get('/', asyncHandler(portfolioController.getPortfolio));
router.post('/', createPortfolioValidator, validateRequest, asyncHandler(portfolioController.createPortfolioEntry));
router.get('/:id', idParamValidator, validateRequest, asyncHandler(portfolioController.getPortfolioEntryById));
router.put('/:id', idParamValidator, updatePortfolioValidator, validateRequest, asyncHandler(portfolioController.updatePortfolioEntry));
router.delete('/:id', idParamValidator, validateRequest, asyncHandler(portfolioController.deletePortfolioEntry));

export default router;
