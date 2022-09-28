const express = require('express');
const router = express.Router();
const getstaff = require('../../controllers/staffcontroller')



router.route('/')
    .get(getstaff.getAllStaff)
    .post(getstaff.createNewStaff)

module.exports = router;