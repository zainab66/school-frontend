import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  addGradeAction,
  getGradeListAction,
  deleteGradeAction,
} from '../actions/gradeActions';

const initialState = {
  gradeList: [],

  messageAddGrade: '',
  isErrorAddGrade: false,
  isSuccessAddGrade: false,
  isLoadingeAddGrade: false,

  messageGetGradeList: '',
  isErrorGetGradeList: false,
  isSuccessGetGradeList: false,
  isLoadingeGetGradeList: false,

  messageDeleteGrade: '',
  isErrorDeleteGrade: false,
  isSuccessDeleteGrade: false,
  isLoadingeDeleteGrade: false,
};

export const addGrade = createAsyncThunk(
  'grade/addGrade',
  async (name, { rejectWithValue }) => {
    try {
      return await addGradeAction(name);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getGrades = createAsyncThunk(
  'grade/getGrades',
  async (rejectWithValue) => {
    try {
      return await getGradeListAction();
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteGrade = createAsyncThunk(
  'grade/deleteGrade',
  async (classId, { rejectWithValue }) => {
    try {
      return await deleteGradeAction(classId);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const GradeSlice = createSlice({
  name: ' Grades',
  initialState,
  reducers: {
    resetGradeReducer: (state) => {
      state.messageAddGrade = '';
      state.isErrorAddGrade = false;
      state.isSuccessAddGrade = false;
      state.isLoadingeAddGrade = false;

      state.messageGetGradeList = '';
      state.isErrorGetGradeList = false;
      state.isSuccessGetGradeList = false;
      state.isLoadingeGetGradeList = false;

      state.messageDeleteGrade = '';
      state.isErrorDeleteGrade = false;
      state.isSuccessDeleteGrade = false;
      state.isLoadingeDeleteGrade = false;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(addGrade.pending, (state) => {
        state.isLoadingeAddGrade = true;
      })
      .addCase(addGrade.fulfilled, (state, action) => {
        state.isLoadingeAddGrade = false;
        state.isSuccessAddGrade = true;
        state.isErrorAddGrade = false;
        state.messageAddGrade = action.payload.message;
      })
      .addCase(addGrade.rejected, (state, action) => {
        state.isSuccessAddGrade = false;
        state.isErrorAddGrade = true;
        state.messageAddGrade = action.payload.message;
      })
      .addCase(getGrades.pending, (state) => {
        state.isLoadingeGetGradeList = true;
      })
      .addCase(getGrades.fulfilled, (state, action) => {
        state.isSuccessGetGradeList = true;
        state.gradeList = action.payload;
      })
      .addCase(getGrades.rejected, (state, action) => {
        state.isLoadingeGetGradeList = false;
        state.isSuccessGetGradeList = false;
        state.isErrorGetGradeList = true;
        state.messageGetGradeList = action.error;
        state.gradeList = null;
      })

      .addCase(deleteGrade.pending, (state) => {
        state.isLoadingeDeleteGrade = true;
      })
      .addCase(deleteGrade.fulfilled, (state, action) => {
        state.isErrorDeleteGrade = false;
        state.isSuccessDeleteGrade = true;
        state.messageDeleteGrade = action.payload.message;
      })
      .addCase(deleteGrade.rejected, (state, action) => {
        state.isSuccessDeleteGrade = false;
        state.isErrorDeleteGrade = true;
        state.messageDeleteGrade = action.payload.message;
      });
  },
});

export const { resetGradeReducer } = GradeSlice.actions;
export default GradeSlice.reducer;
