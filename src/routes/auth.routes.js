import { Router } from 'express';

import { authController } from '../controllers/auth.controller.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { validateRequest } from '../middleware/validation.middleware.js';
import { signupValidator, loginValidator } from '../validators/auth.validators.js';

const router = Router();

router.post('/signup', signupValidator, validateRequest, asyncHandler(authController.signup));
router.post('/login', loginValidator, validateRequest, asyncHandler(authController.login));

export default router;
