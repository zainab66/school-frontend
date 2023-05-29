import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  addStudentAction,
  getStudentListAction,
  deleteStudentInfoAction,
  editStudentAction,
} from '../actions/studentActions';

const initialState = {
  studentList: [],

  messageAddStudent: '',
  isErrorAddStudent: false,
  isSuccessAddStudent: false,
  isLoadingeAddStudent: false,

  isSuccessGetStudentList: false,
  isErrorGetStudentList: false,
  isLoadingeGetStudentList: false,
  messageGetStudentList: '',

  messageDeleteStudent: '',
  isErrorDeleteStudent: false,
  isSuccessDeleteStudent: false,
  isLoadingeDeleteStudent: false,

  messageEditStudent: '',
  isErrorEditStudent: false,
  isSuccessEditStudent: false,
  isLoadingeEditStudent: false,
};

// Register Student
export const addStudent = createAsyncThunk(
  'student/addStudent',
  async (formData, { rejectWithValue }) => {
    try {
      return await addStudentAction(formData);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getStudents = createAsyncThunk(
  'student/getStudents',
  async (thunkAPI) => {
    try {
      return await getStudentListAction();
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

export const deleteStudent = createAsyncThunk(
  'student/deleteStudent',
  async (studentId, { rejectWithValue }) => {
    try {
      return await deleteStudentInfoAction(studentId);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editStudent = createAsyncThunk(
  'student/editStudent',
  async (formData, { rejectWithValue }) => {
    try {
      return await editStudentAction(formData);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const studentSlice = createSlice({
  name: ' students',
  initialState,
  reducers: {
    resetStudentReducer: (state) => {
      state.messageAddStudent = '';
      state.isErrorAddStudent = false;
      state.isSuccessAddStudent = false;
      state.isLoadingeAddStudent = false;

      state.isSuccessGetStudentList = false;
      state.isErrorGetStudentList = false;
      state.isLoadingeGetStudentList = false;
      state.messageGetStudentList = '';

      state.messageDeleteStudent = '';
      state.isErrorDeleteStudent = false;
      state.isSuccessDeleteStudent = false;
      state.isLoadingeDeleteStudent = false;

      state.messageEditStudent = '';
      state.isErrorEditStudent = false;
      state.isSuccessEditStudent = false;
      state.isLoadingeEditStudent = false;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(addStudent.pending, (state) => {
        state.isLoadingeAddStudent = true;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.isLoadingeAddStudent = false;
        state.isSuccessAddStudent = true;
        state.isErrorAddStudent = false;
        state.messageAddStudent = action.payload.message;
      })
      .addCase(addStudent.rejected, (state, action) => {
        state.isSuccessAddStudent = false;
        state.isErrorAddStudent = true;
        state.messageAddStudent = action.payload.message;
      })

      .addCase(getStudents.pending, (state) => {
        state.isLoadingeGetStudentList = true;
      })
      .addCase(getStudents.fulfilled, (state, action) => {
        state.isSuccessGetStudentList = true;
        state.studentList = action.payload;
      })
      .addCase(getStudents.rejected, (state, action) => {
        state.isLoadingeGetStudentList = false;
        state.isSuccessGetStudentList = false;
        state.isErrorGetStudentList = true;
        state.messageGetStudentList = action.error;
        state.studentList = null;
      })

      .addCase(deleteStudent.pending, (state) => {
        state.isLoadingeDeleteStudent = true;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.isErrorDeleteStudent = false;
        state.isSuccessDeleteStudent = true;
        state.messageDeleteStudent = action.payload.message;
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.isSuccessDeleteStudent = false;
        state.isErrorDeleteStudent = true;
        state.messageDeleteStudent = action.payload.message;
      })

      .addCase(editStudent.pending, (state) => {
        state.isLoadingeEditStudent = true;
      })
      .addCase(editStudent.fulfilled, (state, action) => {
        state.isLoadingeEditStudent = false;
        state.isSuccessEditStudent = true;
        state.messageEditStudent = action.payload.message;
      })
      .addCase(editStudent.rejected, (state, action) => {
        state.isLoadingeEditStudent = false;
        state.isErrorEditStudent = true;
        state.messageEditStudent = action.payload.message;
      });
  },
});

export const { resetStudentReducer } = studentSlice.actions;
export default studentSlice.reducer;
