import { join, map, pipe, replace, split, toLower, toUpper } from 'ramda';

export const capitalizeFirstLetter = replace(/^./, toUpper);

export const capitalizeWords = pipe(
  toLower,
  split(' '),
  map(capitalizeFirstLetter),
  join(' '),
);
