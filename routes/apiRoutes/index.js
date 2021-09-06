const router = require('express').Router();
const animalRouter = require('../apiRoutes/animalRoutes');
const zookeeperRouter = require('../apiRoutes/zookeeperRoutes');

router.use(animalRouter, zookeeperRouter);

module.exports = router;