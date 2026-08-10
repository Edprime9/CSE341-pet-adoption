const { body } = require('express-validator');

const adopterValidationRules = [
    body('first_name')
        .trim()
        .notEmpty().withMessage("First name is required.")
        .isString().withMessage("First name must be a string."),
    
    body('last_name')
        .trim()
        .notEmpty().withMessage("Last name is required.")
        .isString().withMessage("Last name must be a string."),

    body('email')
        .trim()
        .notEmpty().withMessage("Email is required.")
        .isString().withMessage("Email must be a string.")
        .isEmail().withMessage("Email must be a valid email address."),

    body('phone')
        .trim()
        .notEmpty().withMessage("Phone number is required.")
        .isString().withMessage("Phone number must be a string.")
        .isMobilePhone().withMessage("Phone number format not valid (999-999-9999)."),

    body('location')
        .notEmpty().withMessage("Location is required.")
        .isObject().withMessage("Location must be an object"),

    body('location.city')
        .trim()
        .notEmpty().withMessage("City is required")
        .isString().withMessage("City must be a string."),

    body('location.state')
        .trim()
        .notEmpty().withMessage("State/Province is required")
        .isString().withMessage("State/Province must be a string."),

    body('location.postal_code')
        .trim()
        .notEmpty().withMessage("Postal code is required")
        .isString().withMessage("Postal code must be a string."),    

    body('preferences')
        .notEmpty().withMessage("Preferences is required.")
        .isObject().withMessage("Preferences must be an object."),
        
    body('preferences.preferred_species')
        .notEmpty().withMessage("Preferred species is required.")
        .isArray({min: 1}).withMessage("Species array must contain at least one item."),
        
    body('preferences.preferred_species.*')
        .trim()
        .isString().withMessage("Each preferred species must be string."),    

    body('preferences.preferred_size')
        .trim()
        .notEmpty().withMessage("Size is required.")
        .isString().withMessage("Size must be a string"),
    
    body('preferences.max_age')
        .notEmpty().withMessage("Max age is required.")
        .isInt({min: 0}).withMessage("Max age must be a integer."),
    
    body('household_info')
        .notEmpty().withMessage("Household information is required.")
        .isObject().withMessage("Household information must be an object."),
    
    body('household_info.housing_type')
        .trim()
        .notEmpty().withMessage("Housing type is required")
        .isString().withMessage("Housing type must be a string."),

    body('household_info.has_yard')
        .notEmpty().withMessage("Yard information is required.")
        .isBoolean().withMessage("Must be a boolean valur(true or false).")
        .toBoolean(),

    body('household_info.has_other_pets')
        .notEmpty().withMessage("Other pets in household information is required.")
        .isBoolean().withMessage("Must be a boolean valur(true or false).")
        .toBoolean(),
        
    body('household_info.has_children')
        .notEmpty().withMessage("Children information is required.")
        .isBoolean().withMessage("Must be a boolean value(true or false).")
        .toBoolean(),    
        
]

module.exports = { adopterValidationRules }