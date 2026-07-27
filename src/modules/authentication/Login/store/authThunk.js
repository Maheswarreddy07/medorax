import { createAsyncThunk } from "@reduxjs/toolkit";

import authService from "../services/authService";

export const loginUser = createAsyncThunk(

    "auth/login",

    async (credentials, thunkAPI) => {

        try {

            const response =
                await authService.login(credentials);

            return response.data;

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data ||

                {

                    message: "Login failed"

                }

            );

        }

    }

);