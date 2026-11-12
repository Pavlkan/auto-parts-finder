const { VITE_API_URL: API_URL, VITE_API_KEY: API_KEY } = import.meta.env;

export class ApiError extends Error {}

export const getGoods = async (params, { signal } = {}) => {
  const query = new URLSearchParams({ key: API_KEY, ...params });

  const response = await fetch(`${API_URL}?${query}`, { signal });
  const { goods, error } = await response.json();

  if (error === 'Request quota exceeded!') throw new ApiError('Превышено число максимальных запросов');
  if (error) throw new ApiError(error);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  return goods ?? [];
};