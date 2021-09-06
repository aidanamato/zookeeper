const router = require('express').Router();
const htmlRouter = require('../htmlRoutes/htmlRoutes');

router.use(htmlRouter);

module.exports = router;