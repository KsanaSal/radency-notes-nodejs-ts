const messages = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  409: 'Conflict',
  500: 'Internal Server Error',
};

interface IExtendedError extends Error {
  status?: number;
}

const HttpError = (status: number, message = messages[status]) => {
  const error: IExtendedError = new Error(message);
  error.status = status;
  return message;
};

export default HttpError;
