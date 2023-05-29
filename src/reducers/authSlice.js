import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getUserProfileAction,
  loginAction,
  registerAction,
  logoutAction,
  editUserProfileAction,
  forgotPassword,
  resetPasswordUser,
  editTeacherProfileAction,
} from '../actions/authActions';

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: user ? user : null,
  isErrorLogin: false,
  isSuccessLogin: false,
  isLoadingLogin: false,
  messageLogin: '',
  isSuccessSignup: false,
  isLoadingSignup: false,
  isErrorSignup: false,
  messageSignup: '',
  messageGetUserProfile: '',
  isErrorGetUserProfile: false,
  isSuccessGetUserProfile: false,
  isLoadingGetUserProfile: false,
  userProfile: {},
  messageEditUserProfile: '',
  isErrorEditUserProfile: false,
  isSuccessEditUserProfile: false,
  isLoadingEditUserProfile: false,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  messageEditTeacherProfile: '',
  isErrorEditTeacherProfile: false,
  isSuccessEditTeacherProfile: false,
  isLoadingEditTeacherProfile: false,
};

export const userForgotPassword = createAsyncThunk(
  'auth/userForgotPassword',
  async ({ email }, { rejectWithValue }) => {
    try {
      return await forgotPassword(email);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ token, password }, { rejectWithValue }) => {
    try {
      return await resetPasswordUser(token, password);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Register user
export const signup = createAsyncThunk(
  'auth/signup',
  async (
    { name, email, password, role, dashboardName },
    { rejectWithValue }
  ) => {
    try {
      return await registerAction(name, email, password, role, dashboardName);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Login user
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      return await loginAction(email, password);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUserProfile = createAsyncThunk(
  'auth/getUserProfile',
  async (id, { rejectWithValue }) => {
    try {
      return await getUserProfileAction(id);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  logoutAction();
});

export const editUserProfile = createAsyncThunk(
  'auth/editUserProfile',
  async (formData, { rejectWithValue }) => {
    try {
      return await editUserProfileAction(formData);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editTeacherProfile = createAsyncThunk(
  'auth/editTeacherProfile',
  async (formData, { rejectWithValue }) => {
    try {
      return await editTeacherProfileAction(formData);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthReducer: (state) => {
      state.isLoadingLogin = false;
      state.isErrorLogin = false;
      state.messageLogin = '';
      state.isSuccessLogin = false;
      state.isSuccessSignup = false;
      state.isLoadingSignup = false;
      state.isErrorSignup = false;
      state.messageSignup = '';
      state.messageGetUserProfile = '';
      state.isErrorGetUserProfile = false;
      state.isSuccessGetUserProfile = false;
      state.isLoadingGetUserProfile = false;
      state.messageEditUserProfile = '';
      state.isErrorEditUserProfile = false;
      state.isSuccessEditUserProfile = false;
      state.isLoadingEditUserProfile = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';

      state.messageEditTeacherProfile = '';
      state.isErrorEditTeacherProfile = false;
      state.isSuccessEditTeacherProfile = false;
      state.isLoadingEditTeacherProfile = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.isLoadingSignup = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoadingSignup = false;
        state.isSuccessSignup = true;
        state.messageSignup = action.payload.message;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoadingSignup = false;
        state.isErrorSignup = true;
        state.messageSignup = action.payload.message;
      })
      .addCase(login.pending, (state) => {
        state.isLoadingLogin = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoadingLogin = false;
        state.isSuccessLogin = true;
        state.messageLogin = action.payload.message;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoadingLogin = false;
        state.isErrorLogin = true;
        state.messageLogin = action.payload.message;
        state.user = null;
      })
      .addCase(getUserProfile.pending, (state) => {
        state.isLoadingGetUserProfile = true;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.isLoadingGetUserProfile = false;
        state.isSuccessGetUserProfile = true;
        state.messageGetUserProfile = action.payload.message;
        state.userProfile = action.payload.profile;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.isLoadingGetUserProfile = false;
        state.isErrorGetUserProfile = true;
        state.messageGetUserProfile = action.payload.message;
      })
      .addCase(editUserProfile.pending, (state) => {
        state.isLoadingEditUserProfile = true;
      })
      .addCase(editUserProfile.fulfilled, (state, action) => {
        state.isLoadingEditUserProfile = false;
        state.isSuccessEditUserProfile = true;
        state.messageEditUserProfile = action.payload.message;
      })
      .addCase(editUserProfile.rejected, (state, action) => {
        state.isLoadingEditUserProfile = false;
        state.isErrorEditUserProfile = true;
        state.messageEditUserProfile = action.payload.message;
      })

      .addCase(userForgotPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userForgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(userForgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
      })

      .addCase(editTeacherProfile.pending, (state) => {
        state.isLoadingEditTeacherProfile = true;
      })
      .addCase(editTeacherProfile.fulfilled, (state, action) => {
        state.isLoadingEditTeacherProfile = false;
        state.isSuccessEditTeacherProfile = true;
        state.messageEditTeacherProfile = action.payload.message;
      })
      .addCase(editTeacherProfile.rejected, (state, action) => {
        state.isLoadingEditTeacherProfile = false;
        state.isErrorEditTeacherProfile = true;
        state.messageEditTeacherProfile = action.payload.message;
      });
  },
});

export const { resetAuthReducer } = authSlice.actions;
export default authSlice.reducer;
