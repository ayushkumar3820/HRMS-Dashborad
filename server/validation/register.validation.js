import Joi from 'joi';

const registerSchema = Joi.object({
  fullName: Joi.string().min(3).max(50).required().messages({
    'string.empty': 'Full Name is required.',
    'string.min': 'Full Name must be at least 3 characters long.',
    'string.max': 'Full Name must be less than 50 characters.',
  }),
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required.',
    'string.email': 'Email must be a valid email address.',
  }),
  password: Joi.string().min(6).max(20).required().messages({
    'string.empty': 'Password is required.',
    'string.min': 'Password must be at least 6 characters long.',
    'string.max': 'Password must be less than 20 characters.',
  }),
  confirmPassword: Joi.string().min(6).max(20).required().messages({
    'string.empty': 'Password is required.',
    'string.min': 'Password must be at least 6 characters long.',
    'string.max': 'Password must be less than 20 characters.',
  }),
  role: Joi.string().valid('user', 'admin').optional(),
});

export const validateRegister = (req, res, next) => {
  const { error } = registerSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      errors: error.details.map((err) => err.message), 
    });
  }

  next();
};
