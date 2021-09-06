const router = require('express').Router();

const {filterByQuery, findById, createNewZookeeper, validateZookeeper}
= require('../../lib/zookeepers');
const {zookeepers} = require('../../data/zookeepers.json');
const { validateAnimal } = require('../../lib/animals');

router.get('/zookeepers', (req, res) => {
  let results = zookeepers;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

router.get('/zookeepers/:id', (req, res) => {
  const results = findById(req.params.id, zookeepers);
  if (result) {
    res.json(results);
  } else {
    res.send(404);
  }
});

router.post('/zookeepers', (req, res) => {
  // add id property to req.body
  req.body.id = zookeepers.length.toString();

  if (!validateZookeeper(req.body)) {
    console.log('false');
    res.status(404).send('The zookeeper is not properly formatted.');
  } else {
    const zookeeper = createNewZookeeper(req.body, zookeepers);
    res.json(zookeeper);
  }
});

module.exports = router;