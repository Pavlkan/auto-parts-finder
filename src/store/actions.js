export const SET_PART_NUMBER = 'SET_PART_NUMBER';
export const SET_BRAND = 'SET_BRAND';

export const BRANDS_REQUEST = 'BRANDS_REQUEST';
export const BRANDS_SUCCESS = 'BRANDS_SUCCESS';
export const BRANDS_FAILURE = 'BRANDS_FAILURE';

export const OFFERS_REQUEST = 'OFFERS_REQUEST';
export const OFFERS_SUCCESS = 'OFFERS_SUCCESS';
export const OFFERS_FAILURE = 'OFFERS_FAILURE';

export const setPartNumber = (partNumber) => ({ type: SET_PART_NUMBER, payload: partNumber });
export const setBrand = (brand) => ({ type: SET_BRAND, payload: brand });

export const brandsRequest = () => ({ type: BRANDS_REQUEST });
export const brandsSuccess = (brands) => ({ type: BRANDS_SUCCESS, payload: brands });
export const brandsFailure = (message) => ({ type: BRANDS_FAILURE, payload: message });

export const offersRequest = () => ({ type: OFFERS_REQUEST });
export const offersSuccess = (offers) => ({ type: OFFERS_SUCCESS, payload: offers });
export const offersFailure = (message) => ({ type: OFFERS_FAILURE, payload: message });