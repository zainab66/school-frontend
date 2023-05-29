import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  addTeacherAction,
  getTeacherListAction,
  deleteTeacherInfoAction,
  editTeacherAction,
  activateTeacherAction,
} from '../actions/teacherActions';

const initialState = {
  teachers: [],

  messageAddTeacher: '',
  isErrorAddTeacher: false,
  isSuccessAddTeacher: false,
  isLoadingeAddTeacher: false,

  isSuccessGetTeacherList: false,
  isErrorGetTeacherList: false,
  isLoadingeGetTeacherList: false,
  messageGetTeacherList: '',

  messageDeleteTeacher: '',
  isErrorDeleteTeacher: false,
  isSuccessDeleteTeacher: false,
  isLoadingeDeleteTeacher: false,

  messageEditTeacher: '',
  isErrorEditTeacher: false,
  isSuccessEditTeacher: false,
  isLoadingeEditTeacher: false,

  isSuccessActivateTeacher: false,
  messageActivateTeacher: '',
  isErrorActivateTeacher: false,
  isLoadingActivateTeacher: false,
};

export const activateTeacher = createAsyncThunk(
  'teacher/activateTeacher',
  async (token, { rejectWithValue }) => {
    try {
      return await activateTeacherAction(token);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Register Teacher
export const addTeacher = createAsyncThunk(
  'teacher/addTeacher',
  async (
    { email, firstName, lastName, role, createdBy, type },
    { rejectWithValue }
  ) => {
    try {
      return await addTeacherAction(
        email,
        firstName,
        lastName,
        role,
        createdBy,
        type
      );
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getTeachers = createAsyncThunk(
  'principle/getTeachers',
  async (thunkAPI) => {
    try {
      return await getTeacherListAction();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteTeacher = createAsyncThunk(
  'principle/deleteUser',
  async (teacherId, { rejectWithValue }) => {
    try {
      return await deleteTeacherInfoAction(teacherId);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editTeacher = createAsyncThunk(
  'principle/editTeacher',
  async (formData, { rejectWithValue }) => {
    try {
      return await editTeacherAction(formData);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const teacherSlice = createSlice({
  name: ' teacher',
  initialState,
  reducers: {
    resetTeacherReducer: (state) => {
      state.messageAddTeacher = '';
      state.isErrorAddTeacher = false;
      state.isSuccessAddTeacher = false;
      state.isLoadingeAddTeacher = false;

      state.isSuccessGetTeacherList = false;
      state.isErrorGetTeacherList = false;
      state.isLoadingeGetTeacherList = false;
      state.messageGetTeacherList = '';

      state.messageDeleteTeacher = '';
      state.isErrorDeleteTeacher = false;
      state.isSuccessDeleteTeacher = false;
      state.isLoadingeDeleteTeacher = false;

      state.messageEditTeacher = '';
      state.isErrorEditTeacher = false;
      state.isSuccessEditTeacher = false;
      state.isLoadingeEditTeacher = false;

      state.isSuccessActivateTeacher = false;
      state.messageActivateTeacher = '';
      state.isErrorActivateTeacher = false;
      state.isLoadingActivateTeacher = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(activateTeacher.pending, (state) => {
        state.isLoadingActivateTeacher = true;
      })
      .addCase(activateTeacher.fulfilled, (state, action) => {
        state.isSuccessActivateTeacher = true;
        state.messageActivateTeacher = action.payload.message;
      })
      .addCase(activateTeacher.rejected, (state, action) => {
        state.isErrorActivateTeacher = true;
        state.messageActivateTeacher = action.payload.message;
      })

      .addCase(addTeacher.pending, (state) => {
        state.isLoadingeAddTeacher = true;
      })
      .addCase(addTeacher.fulfilled, (state, action) => {
        state.isLoadingeAddTeacher = false;
        state.isSuccessAddTeacher = true;
        state.isErrorAddTeacher = false;
        state.messageAddTeacher = action.payload.message;
        state.teachers = action.payload.teachers;
      })
      .addCase(addTeacher.rejected, (state, action) => {
        state.isSuccessAddTeacher = false;
        state.isErrorAddTeacher = true;
        state.messageAddTeacher = action.payload.message;
        state.teachers = null;
      })
      .addCase(getTeachers.pending, (state) => {
        state.isLoadingeGetTeacherList = true;
      })
      .addCase(getTeachers.fulfilled, (state, action) => {
        state.isSuccessGetTeacherList = true;
        state.teacherList = action.payload;
      })
      .addCase(getTeachers.rejected, (state, action) => {
        state.isLoadingeGetTeacherList = false;
        state.isSuccessGetTeacherList = false;
        state.isErrorGetTeacherList = true;
        state.messageGetTeacherList = action.error;
        state.teacherList = null;
      })
      .addCase(deleteTeacher.pending, (state) => {
        state.isLoadingeDeleteTeacher = true;
      })
      .addCase(deleteTeacher.fulfilled, (state, action) => {
        state.isErrorDeleteTeacher = false;
        state.isSuccessDeleteTeacher = true;
        state.messageDeleteTeacher = action.payload.message;
      })
      .addCase(deleteTeacher.rejected, (state, action) => {
        state.isSuccessDeleteTeacher = false;
        state.isErrorDeleteTeacher = true;
        state.messageDeleteTeacher = action.payload.message;
      })

      .addCase(editTeacher.pending, (state) => {
        state.isLoadingeEditTeacher = true;
      })
      .addCase(editTeacher.fulfilled, (state, action) => {
        state.isLoadingeEditTeacher = false;
        state.isSuccessEditTeacher = true;
        state.messageEditTeacher = action.payload.message;
      })
      .addCase(editTeacher.rejected, (state, action) => {
        state.isLoadingeEditTeacher = false;
        state.isErrorEditTeacher = true;
        state.messageEditTeacher = action.payload.message;
      });
  },
});

export const { resetTeacherReducer } = teacherSlice.actions;
export default teacherSlice.reducer;
