export const fetchHandler = async <T>(fn: Promise<T>) => {
  try {
    const response = await fn;
    return response;
  } catch (error) {
    throw error;
  }
};
