const {
  filterByQuery,
  findById,
  createNewZookeeper,
  validateZookeeper
} = require('../lib/zookeepers');
const {zookeepers} = require('../data/zookeepers.json');

jest.mock('fs');

test('create new zookeeper object', () => {
  const zookeeper = createNewZookeeper(
    {name: 'Larry', id: 'ghdjk62738'},
    zookeepers
  )

  expect(zookeeper.name).toBe('Larry');
  expect(zookeeper.id).toBe('ghdjk62738');
});

test('filter request by query parameters', () => {
  const startingZookeepers = [
    {
      "id": "4",
      "name": "Ryan",
      "age": 20,
      "favoriteAnimal": "dog"
    },
    {
      "id": "5",
      "name": "Alex",
      "age": 32,
      "favoriteAnimal": "Sloths"
    },
    {
      "id": "6",
      "name": "Amiko",
      "age": 43,
      "favoriteAnimal": "Quokkas"
    }
  ];

  const updatedZookeepers = filterByQuery({favoriteAnimal: 'dog'}, startingZookeepers);

  expect(updatedZookeepers.length).toBe(1);
});

test('returns zookeeper by id', () => {
  const startingZookeepers = [
    {
      "id": "4",
      "name": "Ryan",
      "age": 20,
      "favoriteAnimal": "dog"
    },
    {
      "id": "5",
      "name": "Alex",
      "age": 32,
      "favoriteAnimal": "Sloths"
    },
    {
      "id": "6",
      "name": "Amiko",
      "age": 43,
      "favoriteAnimal": "Quokkas"
    }
  ];

  const result = findById('5', startingZookeepers);
  console.log(result);

  expect(result.name).toBe('Alex');
});

test('validates favorite animal', () => {
  const zookeeper = {
    "id": "6",
    "name": "Amiko",
    "age": 43,
    "favoriteAnimal": "Quokkas"
  }

  const invalidZookeeper = {
    "id": "6",
      "name": "Amiko",
      "age": 43,
  }

  const result = validateZookeeper(zookeeper);
  const result2 = validateZookeeper(invalidZookeeper);

  expect(result).toBe(true);
  expect(result2).toBe(false);
});