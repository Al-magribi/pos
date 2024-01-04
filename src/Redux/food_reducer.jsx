import {
  ADD_FOOD_FAIL,
  ADD_FOOD_REQ,
  ADD_FOOD_RESET,
  ADD_FOOD_SUCCESS,
  DELETE_FOOD_FAIL,
  DELETE_FOOD_REQ,
  DELETE_FOOD_RESET,
  DELETE_FOOD_SUCCESS,
  DETAIL_FOOD_FAIL,
  DETAIL_FOOD_REQ,
  DETAIL_FOOD_SUCCESS,
  EDIT_FOOD_FAIL,
  EDIT_FOOD_REQ,
  EDIT_FOOD_RESET,
  EDIT_FOOD_SUCCESS,
  GET_FOODS_FAIL,
  GET_FOODS_REQ,
  GET_FOODS_SUCCESS,
} from "./food_constant";

export const getFoodsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_FOODS_REQ:
      return { loading: true };

    case GET_FOODS_SUCCESS:
      return { loading: false, Foods: action.payload };

    case GET_FOODS_FAIL:
      return { loading: false, message: action.payload };

    default:
      return state;
  }
};

export const addFoodReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_FOOD_REQ:
      return { loading: true };

    case ADD_FOOD_SUCCESS:
      return { loading: false, success: true, message: action.payload };

    case ADD_FOOD_FAIL:
      return { loading: false, success: false, message: action.payload };

    case ADD_FOOD_RESET:
      return {};

    default:
      return state;
  }
};

export const food_detail_reducer = (state = {}, action) => {
  switch (action.type) {
    case DETAIL_FOOD_REQ:
      return { loading: true };

    case DETAIL_FOOD_SUCCESS:
      return { loadung: false, food: action.payload };

    case DETAIL_FOOD_FAIL:
      return { loadung: false, error: action.payload };

    default:
      return state;
  }
};

export const up_del_food = (state = {}, action) => {
  switch (action.type) {
    case EDIT_FOOD_REQ:
    case DELETE_FOOD_REQ:
      return { loading: true };

    case EDIT_FOOD_SUCCESS:
      return { loading: false, isEdited: true, edited: action.payload };

    case DELETE_FOOD_SUCCESS:
      return { loading: false, isDeleted: true, deleted: action.payload };

    case EDIT_FOOD_FAIL:
      return { loading: false, isEdited: false, edited: action.payload };

    case DELETE_FOOD_FAIL:
      return { loading: false, isDeleted: false, deleted: action.payload };

    case EDIT_FOOD_RESET:
    case DELETE_FOOD_RESET:
      return {};

    default:
      return state;
  }
};
