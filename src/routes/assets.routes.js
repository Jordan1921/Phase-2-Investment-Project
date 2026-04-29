import { Router } from 'express';

import { assetController } from '../controllers/assets.controller.js';
import { authenticate, authorizeRoles } from '../middleware/auth.middleware.js';
import { validateRequest } from '../middleware/validation.middleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { idParamValidator } from '../validators/common.validators.js';
import { createAssetValidator, updateAssetValidator } from '../validators/assets.validators.js';

const router = Router();

router.use(authenticate);

router.get('/', asyncHandler(assetController.getAssets));
router.post('/', authorizeRoles('admin'), createAssetValidator, validateRequest, asyncHandler(assetController.createAsset));
router.get('/:id', idParamValidator, validateRequest, asyncHandler(assetController.getAssetById));
router.put('/:id', authorizeRoles('admin'), idParamValidator, updateAssetValidator, validateRequest, asyncHandler(assetController.updateAsset));
router.delete('/:id', authorizeRoles('admin'), idParamValidator, validateRequest, asyncHandler(assetController.deleteAsset));

export default router;
