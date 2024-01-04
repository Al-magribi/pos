import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import {
  addFoodReducer,
  food_detail_reducer,
  getFoodsReducer,
  up_del_food,
} from "./Redux/food_reducer";

const reducer = {
  Foods: getFoodsReducer,
  Food: food_detail_reducer,
  addFood: addFoodReducer,
  editFood: up_del_food,
};

const initialState = {};

const middleware = [thunk];

const store = configureStore({
  reducer: reducer,
  initialState: initialState,
  middleware: middleware,
});

export default store;
