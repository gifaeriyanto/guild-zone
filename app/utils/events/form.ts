import { FormEvent } from 'react';
import { ObjectFromList } from 'utils/types';

export const formPreventDefault = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  return e;
};

export const getFormData = (e: FormEvent<HTMLFormElement>) => {
  const formData = new FormData(e.currentTarget);
  return formData;
};

export const getFieldsData =
  <T extends string>(fields: T[]) =>
  (formData: FormData) => {
    const fieldsData = fields.reduce(
      (prev, curr) => ({
        ...prev,
        [curr]: formData.get(curr),
      }),
      {} as ObjectFromList<typeof fields, string>,
    );
    return fieldsData;
  };
