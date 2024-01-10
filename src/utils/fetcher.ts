const wrap = <T>(arg: Promise<Response>): Promise<T> => {
  return new Promise((resolve, reject) => {
    arg
      .then((response) => {
        if (response.ok) {
          response
            .json()
            .then((json) => {
              resolve(json);
            })
            .catch((error) => {
              reject(error);
            });
        } else {
          reject(response);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const fetcher = <T = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> => {
  return wrap<T>(fetch(input, init));
};
