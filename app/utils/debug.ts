export const log = <T extends unknown>(data: T) => {
  console.log(data);
  return data;
};
