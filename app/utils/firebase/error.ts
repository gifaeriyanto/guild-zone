import { AuthError } from 'firebase/auth';
import { pipe, replace } from 'ramda';
import { capitalizeFirstLetter } from 'utils/string';

export const errorMessage = (type: string) => (error: AuthError) =>
  pipe(
    replace(`${type}/`, ''),
    replace(/-/g, ' '),
    capitalizeFirstLetter,
  )(error.code);

export const errorHandler = (type: string) => (error: Error | undefined) => {
  if (!error && !error?.['code']) {
    return;
  }
  const authError = error as AuthError;
  return errorMessage(type)(authError);
};
