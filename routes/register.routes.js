const express = require('express');
const { postUser } = require('../controllers/register.controller');
const router = express.Router();

router.post("/", (postUser));


module.exports = router;