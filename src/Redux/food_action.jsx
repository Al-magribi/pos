import axios from "axios";
import {
  ADD_FOOD_FAIL,
  ADD_FOOD_REQ,
  ADD_FOOD_SUCCESS,
  DELETE_FOOD_FAIL,
  DELETE_FOOD_REQ,
  DELETE_FOOD_SUCCESS,
  GET_FOODS_FAIL,
  GET_FOODS_REQ,
  GET_FOODS_SUCCESS,
} from "./food_constant";

const axiosApi = axios.create({ baseURL: import.meta.env.VITE_API });

export const getFoods = () => async (dispatch) => {
  try {
    dispatch({ type: GET_FOODS_REQ });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosApi.get("/api/food/get-all", config);

    dispatch({ type: GET_FOODS_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: GET_FOODS_FAIL, payload: error.message });
  }
};

export const addFood = (food) => async (dispatch) => {
  try {
    dispatch({ type: ADD_FOOD_REQ });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosApi.post("/api/food/add", food, config);

    dispatch({ type: ADD_FOOD_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({ type: ADD_FOOD_FAIL, payload: error.message });
  }
};

export const deleteFood = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_FOOD_REQ });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosApi.delete(`/api/food/delete/${id}`, config);

    dispatch({ type: DELETE_FOOD_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({ type: DELETE_FOOD_FAIL, payload: error.message });
  }
};
