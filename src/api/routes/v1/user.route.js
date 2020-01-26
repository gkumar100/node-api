const express = require('express');
const validate = require('express-validation');

const controller = require('../../controllers/user.controller');
const validation = require('../../validations/user.validation');
const authenticated = require('../../middlewares/authenticated');
const expressJwt = require('../../utils/jwt');

const router = express.Router();

// un protected route
// Notice the same names of functions/object in validation and controller
router.route('/greet-me').get(authenticated, validate(validation.me),controller.me);
router.route('/createUser').post(validate(validation.createUser),controller.createUser);
router.route('/authenticate').post(expressJwt.jwt(),controller.authenticate);
router.route('/updateUser').post(authenticated,validate(validation.updateUser),controller.updateUser);
router.route('/deleteUser').get(authenticated,validate(validation.deleteUser),controller.deleteUser);
router.route('/getAllUser').get(authenticated,controller.getAllUser);
// protected route
router.route('/greet-me-protected').get(authenticated, validate(validation.me), controller.me);

module.exports = router;
