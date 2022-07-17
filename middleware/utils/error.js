export const createError = (status, message) => {
  const error = new Error(message);
  error.code = status;
  throw error;
};
