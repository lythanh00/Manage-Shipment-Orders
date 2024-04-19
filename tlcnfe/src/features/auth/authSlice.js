import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as authApi from '~/api/authApi/authApi';
import * as userApi from '~/api/userApi/userApi';

export const signInPassWord = createAsyncThunk('auth/signInPassWord', async (params, { rejectWithValue }) => {
    try {
        const res = await authApi.loginPass(params);
        return res;
    } catch (error) {
        return rejectWithValue(error.response.data.result);
    }
});
export const logout = createAsyncThunk('auth/logout', async (params, thunkAPI) => {
    // await authApi.logout();
});
export const updateUser = createAsyncThunk('userprofile', async (params, thunkAPI) => {
    const res = await userApi.putUpdateUser(params);
    return res;
});

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        currentUser: null,
        loading: false,
        error: '',
        typeLogin: '',
        isError: false,
    },
    reducers: {
        refetchToken: (state, action) => {
            state.currentUser = action.payload;
        },
        resetStoreAuth: (state, action) => {
            state.currentUser = null;
            state.loading = false;
            state.error = '';
            state.typeLogin = '';
        },
    },
    extraReducers: (builder) => {
        builder.addCase(signInPassWord.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(signInPassWord.rejected, (state, action) => {
            state.loading = false;
            // state.error = action.payload.msg;
            state.isError = true;
        });
        builder.addCase(signInPassWord.fulfilled, (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
            state.typeLogin = 'password';
        });
        builder.addCase(logout.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(logout.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
        builder.addCase(logout.fulfilled, (state, action) => {
            state.loading = false;
            state.currentUser = null;
            state.typeLogin = '';
        });
        builder.addCase(updateUser.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(updateUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
            state.typeLogin = 'password';
        });
    },
});
export const { refetchToken, resetStoreAuth } = authSlice.actions;

export default authSlice.reducer;
