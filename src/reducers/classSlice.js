import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  addClassAction,
  getClassListAction,
  deleteClassAction,
} from '../actions/classActions';

const initialState = {
  classList: [],

  messageAddClass: '',
  isErrorAddClass: false,
  isSuccessAddClass: false,
  isLoadingeAddClass: false,

  messageGetClassList: '',
  isErrorGetClassList: false,
  isSuccessGetClassList: false,
  isLoadingeGetClassList: false,

  messageDeleteClass: '',
  isErrorDeleteClass: false,
  isSuccessDeleteClass: false,
  isLoadingeDeleteClass: false,
};

export const addClass = createAsyncThunk(
  'class/addClass',
  async ({ name, teacherName, gradeId }, { rejectWithValue }) => {
    try {
      return await addClassAction({ name, teacherName, gradeId });
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteClass = createAsyncThunk(
  'class/deleteClass',
  async (classId, { rejectWithValue }) => {
    try {
      return await deleteClassAction(classId);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getClasses = createAsyncThunk(
  'class/getClasses',
  async (rejectWithValue) => {
    try {
      return await getClassListAction();
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const classSlice = createSlice({
  name: ' classes',
  initialState,
  reducers: {
    resetClassReducer: (state) => {
      state.messageAddClass = '';
      state.isErrorAddClass = false;
      state.isSuccessAddClass = false;
      state.isLoadingeAddClass = false;

      state.messageGetClassList = '';
      state.isErrorGetClassList = false;
      state.isSuccessGetClassList = false;
      state.isLoadingeGetClassList = false;

      state.messageDeleteClass = '';
      state.isErrorDeleteClass = false;
      state.isSuccessDeleteClass = false;
      state.isLoadingeDeleteClass = false;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(addClass.pending, (state) => {
        state.isLoadingeAddClass = true;
      })
      .addCase(addClass.fulfilled, (state, action) => {
        state.isLoadingeAddClass = false;
        state.isSuccessAddClass = true;
        state.isErrorAddClass = false;
        state.messageAddClass = action.payload.message;
      })
      .addCase(addClass.rejected, (state, action) => {
        state.isSuccessAddClass = false;
        state.isErrorAddClass = true;
        state.messageAddClass = action.payload.message;
      })
      .addCase(getClasses.pending, (state) => {
        state.isLoadingeGetClassList = true;
      })
      .addCase(getClasses.fulfilled, (state, action) => {
        state.isSuccessGetClassList = true;
        state.classList = action.payload;
      })
      .addCase(getClasses.rejected, (state, action) => {
        state.isLoadingeGetStudentList = false;
        state.isSuccessGetClassList = false;
        state.isErrorGetClassList = true;
        state.messageGetClassList = action.error;
        state.classList = null;
      })

      .addCase(deleteClass.pending, (state) => {
        state.isLoadingeDeleteClass = true;
      })
      .addCase(deleteClass.fulfilled, (state, action) => {
        state.isErrorDeleteClass = false;
        state.isSuccessDeleteClass = true;
        state.messageDeleteClass = action.payload.message;
      })
      .addCase(deleteClass.rejected, (state, action) => {
        state.isSuccessDeleteClass = false;
        state.isErrorDeleteClass = true;
        state.messageDeleteClass = action.payload.message;
      });
  },
});

export const { resetClassReducer } = classSlice.actions;
export default classSlice.reducer;
