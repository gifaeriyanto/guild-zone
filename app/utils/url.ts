import { ObjectFromList } from 'utils/types';

export const getSearchParams = () =>
  new URLSearchParams(window.location.search);

export const getQueries =
  <T extends string>(keys: T[]) =>
  (params: URLSearchParams) => {
    const queries = keys.reduce(
      (prev, curr) => ({
        ...prev,
        [curr]: params.get(curr),
      }),
      {} as ObjectFromList<typeof keys, string>,
    );
    return queries;
  };
