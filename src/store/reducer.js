import {
  BRANDS_FAILURE,
  BRANDS_REQUEST,
  BRANDS_SUCCESS,
  OFFERS_FAILURE,
  OFFERS_REQUEST,
  OFFERS_SUCCESS,
  SET_BRAND,
  SET_ARTICLE,
} from './actions';

const emptyRequest = { data: null, isLoading: false, error: null };

const initialState = {
  article: '',
  brand: null,
  brands: emptyRequest,
  offers: emptyRequest,
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_ARTICLE:
      // A new number in article starts the search from scratch
      return { ...initialState, number: payload };
    case SET_BRAND:
      return { ...state, brand: payload };

    case BRANDS_REQUEST:
      return { ...state, brands: { ...emptyRequest, isLoading: true } };
    case BRANDS_SUCCESS:
      return { ...state, brands: { ...emptyRequest, data: payload } };
    case BRANDS_FAILURE:
      return { ...state, brands: { ...emptyRequest, error: payload } };

    case OFFERS_REQUEST:
      return { ...state, offers: { ...emptyRequest, isLoading: true } };
    case OFFERS_SUCCESS:
      return { ...state, offers: { ...emptyRequest, data: payload } };
    case OFFERS_FAILURE:
      return { ...state, offers: { ...emptyRequest, error: payload } };

    default:
      return state;
  }
};