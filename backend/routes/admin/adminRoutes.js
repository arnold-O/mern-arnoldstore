
const express = require('express')
const { signup, signin, protectedroutes } = require('../../controllers/admin/authAdmin');
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require('../../validators/auth');




const router = express.Router();



router.route('/signup',  ).post( validateSignupRequest, isRequestValidated, signup)
router.route('/signin').post( validateSigninRequest, isRequestValidated, signin)






module.exports = router