const { body } = require('express-validator');

const applicationValidationRules = [
    body('pet_id')
        .trim()
        .notEmpty().withMessage("Pet id required.")
        .isString().withMessage("Pet id must be a string.")       
        .isMongoId().withMessage("Invalid Mongo Id format."),
        
    body('adopter_id')
        .trim()
        .notEmpty().withMessage("Adopter id required.")
        .isString().withMessage("Adopter id must be a string.")
        .isMongoId().withMessage("Invalid Mongo Id format."),
          
    body('shelter_id')
        .trim()
        .notEmpty().withMessage("Shelter id required.")
        .isString().withMessage("Shelter id must be a string.")
        .isMongoId().withMessage("Invalid Mongo Id format."),
               
    body('status')
        .trim()
        .notEmpty().withMessage("Status required.")
        .isString().withMessage("Status must be a string.")
        .toLowerCase()
        .isIn(['approved', 'pending', 'under review'])
            .withMessage("Only 3 status are valid. Approved, Pending and Under review."),
         
    body('submission_date')
        .trim()
         .notEmpty().withMessage("Date required.")
        .isString().withMessage("date must be a string.")
        .isISO8601().withMessage('Submission date must be a valid ISO8601 date (YYYY-MM-DD)'),
            
    body('notes')
    .trim()
    .notEmpty().withMessage("Notes required")
    .isString().withMessage("Notes should be a string")
           
]

module.exports = { applicationValidationRules }