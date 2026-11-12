import { useDispatch, useSelector } from 'react-redux';
import { ApiError } from '../api/client';
import { fetchBrands, fetchOffers } from '../api/parts';
import {
  brandsFailure,
  brandsRequest,
  brandsSuccess,
  offersFailure,
  offersRequest,
  offersSuccess,
  setBrand,
  setPartNumber,
} from '../store/actions';
import { useApi } from './useApi';

const GENERIC_ERROR = 'Не удалось загрузить данные. Проверьте подключение и попробуйте ещё раз.';

const getErrorMessage = (error) => (error instanceof ApiError ? error.message : GENERIC_ERROR);
const isAborted = (error) => error.name === 'AbortError';

// Binds the parts API to the store: exposes the search state and the actions that drive it
export const usePartsSearch = () => {
  const dispatch = useDispatch();

  const number = useSelector((state) => state.number);
  const brand = useSelector((state) => state.brand);
  const brands = useSelector((state) => state.brands);
  const offers = useSelector((state) => state.offers);

  const brandsApi = useApi(fetchBrands);
  const offersApi = useApi(fetchOffers);

  const loadBrands = async (partNumber) => {
    dispatch(brandsRequest());

    try {
      dispatch(brandsSuccess(await brandsApi.call({ number: partNumber })));
    } catch (error) {
      if (!isAborted(error)) dispatch(brandsFailure(getErrorMessage(error)));
    }
  };

  const loadOffers = async (partNumber, brandName) => {
    dispatch(offersRequest());

    try {
      dispatch(offersSuccess(await offersApi.call({ number: partNumber, brand: brandName })));
    } catch (error) {
      if (!isAborted(error)) dispatch(offersFailure(getErrorMessage(error)));
    }
  };

  // An empty query clears the search.
  const search = (query) => {
    if (query === number) return;

    brandsApi.abort();
    offersApi.abort();
    dispatch(setPartNumber(query));

    if (query) {
      loadBrands(query);
    };
  };

  const selectBrand = (brandName) => {
    dispatch(setBrand(brandName));
    loadOffers(number, brandName);
  };

  return {
    number,
    brand,
    brands,
    offers,
    search,
    selectBrand,
    retryBrands: () => loadBrands(number),
    retryOffers: () => loadOffers(number, brand),
  };
};