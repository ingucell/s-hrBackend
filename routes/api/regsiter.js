const express = require('express');
const router = express.Router();
const registerStaff = require('../../controllers/registerStaffController')


router.route('/reg')
   .post(registerStaff.handleNewStaff)
module.exports = router;