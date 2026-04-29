import { Router } from 'express';

import { alertController } from '../controllers/alerts.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { validateRequest } from '../middleware/validation.middleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { idParamValidator } from '../validators/common.validators.js';
import { createAlertValidator, updateAlertValidator } from '../validators/alerts.validators.js';

const router = Router();

router.use(authenticate);

router.get('/', asyncHandler(alertController.getAlerts));
router.post('/', createAlertValidator, validateRequest, asyncHandler(alertController.createAlert));
router.get('/:id', idParamValidator, validateRequest, asyncHandler(alertController.getAlertById));
router.put('/:id', idParamValidator, updateAlertValidator, validateRequest, asyncHandler(alertController.updateAlert));
router.delete('/:id', idParamValidator, validateRequest, asyncHandler(alertController.deleteAlert));

export default router;
