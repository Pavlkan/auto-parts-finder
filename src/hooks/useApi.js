import { useRef } from 'react';

/**
 * Wraps an API function so that each `call(params)` aborts the previous one
 * `call(params)` returns the request promise; aborted calls reject with an AbortError
 */
export const useApi = (request) => {
  const controllerRef = useRef(null);

  const abort = () => controllerRef.current?.abort();

  const call = (params) => {
    abort();
    controllerRef.current = new AbortController();

    return request(params, { signal: controllerRef.current.signal });
  };

  return { call, abort };
};