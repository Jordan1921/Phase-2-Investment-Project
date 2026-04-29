import { body } from 'express-validator';

export const createPortfolioValidator = [
  body('assetId')
    .isInt({ min: 1 })
    .withMessage('assetId must be a positive integer')
    .toInt(),
  body('quantity')
    .isFloat({ gt: 0 })
    .withMessage('quantity must be greater than 0')
    .toFloat(),
  body('buyPrice')
    .isFloat({ min: 0 })
    .withMessage('buyPrice must be a non-negative number')
    .toFloat()
];

export const updatePortfolioValidator = [
  body('assetId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('assetId must be a positive integer')
    .toInt(),
  body('quantity')
    .optional()
    .isFloat({ gt: 0 })
    .withMessage('quantity must be greater than 0')
    .toFloat(),
  body('buyPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('buyPrice must be a non-negative number')
    .toFloat()
];
