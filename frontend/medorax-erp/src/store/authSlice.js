import { createSlice } from "@reduxjs/toolkit";

import { loginUser } from "./authThunk";

const initialState = {

    loading: false,

    error: null,

    user: null,

    token: null,

    isAuthenticated: false

};

const authSlice = createSlice({

    name: "auth",

    initialState,

    reducers: {

        logout(state) {

            state.user = null;
            state.token = null;
            state.isAuthenticated = false;

        }

    },

    extraReducers: builder => {

        builder

            .addCase(loginUser.pending, state => {

                state.loading = true;
                state.error = null;

            })

            .addCase(loginUser.fulfilled, (state, action) => {

                state.loading = false;

                state.user = action.payload.user;

                state.token = action.payload.token;

                state.isAuthenticated = true;

            })

            .addCase(loginUser.rejected, (state, action) => {

                state.loading = false;

                state.error = action.payload?.message;

            });

    }

});

export const {

    logout

} = authSlice.actions;

export default authSlice.reducer;