import { body } from 'express-validator';

export const createAssetValidator = [
  body('symbol')
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage('symbol is required and must be 1-20 characters'),
  body('name')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('name is required and must be 1-100 characters'),
  body('type')
    .isIn(['stock', 'crypto'])
    .withMessage('type must be stock or crypto'),
  body('price')
    .isFloat({ min: 0 })
    .withMessage('price must be a non-negative number')
    .toFloat()
];

export const updateAssetValidator = [
  body('symbol')
    .optional()
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage('symbol must be 1-20 characters'),
  body('name')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('name must be 1-100 characters'),
  body('type')
    .optional()
    .isIn(['stock', 'crypto'])
    .withMessage('type must be stock or crypto'),
  body('price')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('price must be a non-negative number')
    .toFloat()
];
