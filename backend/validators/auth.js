
const { check, validationResult } = require('express-validator');

exports.validateSignupRequest= [
    
        check('firstName')
        .notEmpty()
        .withMessage('firstname is required'),
        check('lastName')
        .notEmpty()
        .withMessage('lastname is required'),
        check('email')
        .isEmail()
        .withMessage('email is required'),
        check('password')
        .isLength({min:5})
        .withMessage('password must be at least 5 character')
    
]
exports.validateSigninRequest= [
    
        check('email')
        .isEmail()
        .withMessage('email is required'),
        check('password')
        .isLength({min:5})
        .withMessage('password must be at least 5 character')
    
]


exports.isRequestValidated = (req, res, next)=>{
        const errors = validationResult(req);
        if(errors.array().length >0){
                res.status(400).json({
                        erorr: errors.array()[0].msg
                })
        }
        next()
}