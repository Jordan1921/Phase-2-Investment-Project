import { body } from 'express-validator';

export const createAlertValidator = [
  body('assetId')
    .isInt({ min: 1 })
    .withMessage('assetId must be a positive integer')
    .toInt(),
  body('targetPrice')
    .isFloat({ min: 0 })
    .withMessage('targetPrice must be a non-negative number')
    .toFloat(),
  body('condition')
    .isIn(['above', 'below'])
    .withMessage('condition must be above or below'),
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean')
    .toBoolean()
];

export const updateAlertValidator = [
  body('assetId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('assetId must be a positive integer')
    .toInt(),
  body('targetPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('targetPrice must be a non-negative number')
    .toFloat(),
  body('condition')
    .optional()
    .isIn(['above', 'below'])
    .withMessage('condition must be above or below'),
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean')
    .toBoolean()
];
