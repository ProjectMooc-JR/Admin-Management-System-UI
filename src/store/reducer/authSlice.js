import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    //name: 'auth' 指定了这个 slice 的名称为 "auth"。Redux Toolkit 会使用这个名称来生成相关的 action 类型，例如 auth/login auth/logout
    name: "auth",
    initialState: () => { //初始化 状态
        const accesstoken = localStorage.getItem('access_token');

        
        if (!accesstoken) {
            return {
                IsAuth: false,
                token: null,
                user: null
            };
        }

        return {
            IsAuth: true,
            accesstoken,
            user: JSON.parse(localStorage.getItem('loginInfo'))
        };
    },
    reducers: {
        login(state, action) {
            state.IsAuth = true;
            state.accesstoken = action.payload.accesstoken;
            state.user = action.payload.user;

            //本地存储 redux的东西存储到内存中 应为刷新页面登录就没了 需要本地存储 保存登录状态
            localStorage.setItem('access_token', state.accesstoken);
            localStorage.setItem('loginInfo', JSON.stringify(state.user));
        },
        logout(state, action) {
            state.IsAuth = false;
            state.accesstoken = '';
            state.user = null;

            localStorage.removeItem('access_token');
            localStorage.removeItem('loginInfo');
        }
    }
});

export const { login, logout } = authSlice.actions;

export default authSlice;
