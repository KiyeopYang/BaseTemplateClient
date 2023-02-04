import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from 'unique-names-generator';

export default function getUniqueName() {
  const shortName: string = uniqueNamesGenerator({
    dictionaries: [colors, adjectives, animals],
    seed: Math.floor(Math.random() * 100000),
  });

  return shortName;
}
