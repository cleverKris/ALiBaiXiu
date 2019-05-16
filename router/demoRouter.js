const express = require('express');

//引入demoController.js(负责处理的逻辑代码)
const demoController = require('../controller/demoController');

const router = express.Router();

router.get('/demo', (request, response) => {
    demoController.getDemo(request, response);
});

module.exports = router;