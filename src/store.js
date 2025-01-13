import { configureStore } from "@reduxjs/toolkit";
import stepReducer from "./formStep/stepSlice";

export const store = configureStore({
    reducer: {
        step: stepReducer,
    },
});