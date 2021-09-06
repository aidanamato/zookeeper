const {
  filterByQuery,
  findById,
  createNewAnimal,
  validateAnimal
} = require('../lib/animals');
const {animals} = require('../data/animals');

jest.mock('fs');
test('create new animal object', () => {
  const animal = createNewAnimal(
    {name: 'Simba', id: 'ai283ifj0'},
    animals
  )

  expect(animal.name).toBe('Simba');
  expect(animal.id).toBe('ai283ifj0');
});

test('filters request by query parameters', () => {
  const startingAnimals = [
    {
      id: "3",
      name: "Erica",
      species: "gorilla",
      diet: "omnivore",
      personalityTraits: ["quirky", "rash"],
    },
    {
      id: "4",
      name: "Noel",
      species: "bear",
      diet: "carnivore",
      personalityTraits: ["impish", "sassy", "brave"],
    },
  ];

  const updatedAnimals = filterByQuery({ species: "gorilla" }, startingAnimals);

  expect(updatedAnimals.length).toEqual(1);
});

test('returns animal by unique id', () => {
  const startingAnimals = [
    {
      id: "3",
      name: "Erica",
      species: "gorilla",
      diet: "omnivore",
      personalityTraits: ["quirky", "rash"],
    },
    {
      id: "4",
      name: "Noel",
      species: "bear",
      diet: "carnivore",
      personalityTraits: ["impish", "sassy", "brave"],
    },
  ];

  const result = findById('4', startingAnimals);

  expect(result.name).toBe('Noel');
});

test('validates personality traits', () => {
  const animal = {
    id: "3",
    name: "Erica",
    species: "gorilla",
    diet: "omnivore",
    personalityTraits: ["quirky", "rash"],
  };

  const invalidAnimal = {
    id: "3",
    name: "Erica",
    species: "gorilla",
    diet: "omnivore",
  };

  result = validateAnimal(animal);
  result2 = validateAnimal(invalidAnimal);

  expect(result).toBe(true);
  expect(result2).toBe(false);
});

