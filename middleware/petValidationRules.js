const { body } = require('express-validator');

const petValidationRules = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isString().withMessage('Name must be a string'),

  body('species')
    .trim()
    .notEmpty().withMessage('Species is required')
    .isString().withMessage('Species must be a string'),

  body('breed')
    .trim()
    .notEmpty().withMessage('Breed is required')
    .isString().withMessage('Breed must be a string'),

  body('age')
    .isInt({ min: 0 }).withMessage('Age must be a positive integer'),

  body('gender')
    .trim()
    .isIn(['Male', 'Female']).withMessage('Gender must be Male or Female'),

  body('size')
    .trim()
    .isIn(['Small', 'Medium', 'Large', 'Extra Large']).withMessage('Invalid size category'),

  body('status')
    .trim()
    .isIn(['available', 'adopted', 'pending']).withMessage('Invalid status. Must be "available", "adopted" or "pending"'),

  body('shelter_id')
    .trim()
    .isMongoId().withMessage('Invalid shelter ID format'),

  body('description')
    .trim()
    .optional({ nullable: true })
    .isString().withMessage('Description must be a string'),

  body('traits')
    .isArray({ min: 1 }).withMessage('Traits must be an array with at least one item'),
  
  body('traits.*')
    .trim()
    .isString().withMessage('Each trait must be a string'),

  body('intake_date')
    .trim()
    .isISO8601().withMessage('Intake date must be a valid ISO8601 date (YYYY-MM-DD)'),
];

module.exports = { petValidationRules };