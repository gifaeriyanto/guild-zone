import { replace, toUpper } from 'ramda';

export const capitalizeFirstLetter = replace(/^./, toUpper);
