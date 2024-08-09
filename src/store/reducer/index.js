import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";

const store = configureStore({
    //配置 reducer 
    reducer: {
        auth: authSlice.reducer
    }
});

export default store