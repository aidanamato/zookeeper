const express = require('express');
const fs = require('fs');
const path = require('path');

const {animals} = require('./data/animals');

const PORT = process.env.PORT || 3001;

const app = express();

// parse incoming string or array data
app.use(express.urlencoded({extend: true}));
//parse incoming JSON data
app.use(express.json());
app.use(express.static('public'));

function filterByQuery(query, animalsArr) {
  let personalityTraitsArr = [];
  let filteredResults = animalsArr;

  if (query.personalityTraits) {
    // save personality traits as a dedicated array
    if (typeof query.personalityTraits === 'string') {
      personalityTraitsArr = [query.personalityTraits];
    } else {
      personalityTraitsArr = query.personalityTraits;
    }
    // loop through each trait in the personality traits array
    personalityTraitsArr.forEach(trait => {
      // Check the trait against each animal in the filteredResults array.
      // Remember, it is initially a copy of the animalsArray,
      // but here we're updating it for each trait in the .forEach() loop.
      // For each trait being targeted by the filter, the filteredResults
      // array will then contain only the entries that contain the trait,
      // so at the end we'll have an array of animals that have every one 
      // of the traits when the .forEach() loop is finished.
      filteredResults = filteredResults.filter(
        animal => animal.personalityTraits.indexOf(trait) !== -1
      );
    });
  }
  if (query.diet) {
    filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
  }
  if (query.species) {
    filteredResults = filteredResults.filter(animal => animal.species === query.species);
  }
  if (query.name) {
    filteredResults = filteredResults.filter(animal => animal.name === query.name);
  }
  // return the filtered results:
  return filteredResults;
}

function findById(id, animalsArr) {
  const results = animalsArr.filter(animal => animal.id === id)[0];
  return results;
}

function createNewAnimal(body, animalsArr) {
  const animal = body;
  animalsArr.push(animal);
  fs.writeFileSync(
    path.join(__dirname, './data/animals.json'),
    JSON.stringify({animals: animalsArr}, null, 2)
  );
  return(animal);
}

function validateAnimal(animal) {
  if (!animal.name || typeof animal.name !== 'string') {
    return false;
  }
  if (!animal.species || typeof animal.species !== 'string') {
    return false;
  }
  if (!animal.diet || typeof animal.diet !== 'string') {
    return false;
  }
  if (!animal.personalityTraits || !Array.isArray(animal.personalityTraits)) {
    return false;
  }
  return true;
}

app.get('/api/animals', (req, res) => {
  let results = animals;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

app.get('/api/animals/:id', (req, res) => {
  const results = findById(req.params.id, animals);
  if (results) {
    res.json(results);
  } else {
    res.send(404);
  }
});

app.post('/api/animals', (req, res) => {
  // add id property to req.body
  req.body.id = animals.length.toString();
  
  if (!validateAnimal(req.body)) {
    res.status(400).send('The animal is not properly formatted.');
  } else {
      // add animal to json file and animals array
    const animal = createNewAnimal(req.body, animals);
    res.json(animal);
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/animals', (req, res) => {
  res.sendFile(path.join(__dirname, './public/animals.html'))
});

app.get('/zookeepers', (req, res) => {
  res.sendFile(path.join(__dirname, './public/zookeepers.html'))
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}`);
});