import {
  DISCOUNT_LIST_REQUEST,
  DISCOUNT_LIST_SUCCESS,
  DISCOUNT_LIST_FAIL,
  DISCOUNT_DETAILS_REQUEST,
  DISCOUNT_DETAILS_SUCCESS,
  DISCOUNT_DETAILS_FAIL,
  DISCOUNT_CREATE_REQUEST,
  DISCOUNT_CREATE_SUCCESS,
  DISCOUNT_CREATE_FAIL,
  DISCOUNT_CREATE_RESET,
  DISCOUNT_UPDATE_REQUEST,
  DISCOUNT_UPDATE_SUCCESS,
  DISCOUNT_UPDATE_FAIL,
  DISCOUNT_UPDATE_RESET,
  DISCOUNT_DELETE_REQUEST,
  DISCOUNT_DELETE_SUCCESS,
  DISCOUNT_DELETE_FAIL,
} from '../constants/discountConstants';

export const discountListReducer = (state = { discounts: [] }, action) => {
  switch (action.type) {
    case DISCOUNT_LIST_REQUEST:
      return { loading: true, discounts: [] };
    case DISCOUNT_LIST_SUCCESS:
      return { loading: false, discounts: action.payload };
    case DISCOUNT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const discountDetailsReducer = (state = { discount: {} }, action) => {
  switch (action.type) {
    case DISCOUNT_DETAILS_REQUEST:
      return { loading: true, ...state };
    case DISCOUNT_DETAILS_SUCCESS:
      return { loading: false, discount: action.payload };
    case DISCOUNT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const discountCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case DISCOUNT_CREATE_REQUEST:
      return { loading: true };
    case DISCOUNT_CREATE_SUCCESS:
      return { loading: false, success: true, discount: action.payload };
    case DISCOUNT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case DISCOUNT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const discountUpdateReducer = (state = { discount: {} }, action) => {
  switch (action.type) {
    case DISCOUNT_UPDATE_REQUEST:
      return { loading: true };
    case DISCOUNT_UPDATE_SUCCESS:
      return { loading: false, success: true, discount: action.payload };
    case DISCOUNT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case DISCOUNT_UPDATE_RESET:
      return { discount: {} };
    default:
      return state;
  }
};

export const discountDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DISCOUNT_DELETE_REQUEST:
      return { loading: true };
    case DISCOUNT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case DISCOUNT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};