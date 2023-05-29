import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  addTask,
  getTaskList,
  addList,
  getList,
  editCards,
  deleteTask,
} from '../actions/taskAction';

const initialState = {
  taskList: [],
  list: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  isLoadingAddNewTask: false,
  isErrorAddNewTask: false,
  isSuccessAddNewTask: false,
  messageAddNewTask: '',
  isLoadingAddNewList: false,
  isErrorAddNewList: false,
  isSuccessAddNewList: false,
  messageAddNewList: '',
  isErrorGetList: false,
  isSuccessGetList: false,
  messageGetList: '',
  isLoadingGetList: false,
  isErrorEditCard: false,
  isLoadingEditCard: false,
  isSuccessEditCard: false,
  messageEditCard: '',
  isLoadingDelTask: false,
  isSuccessDelTask: false,
  messageDelTask: '',
  isErrorDelTask: false,
};

export const addNewList = createAsyncThunk(
  'task/addNewList',
  async ({ title, createdBy }, { rejectWithValue }) => {
    try {
      return await addList(title, createdBy);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getLists = createAsyncThunk('task/getLists', async (thunkAPI) => {
  try {
    return await getList();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const editCard = createAsyncThunk(
  'task/editCard',
  async ({ cardId, source, listId }, { rejectWithValue }) => {
    try {
      return await editCards({
        cardId,
        source,
        listId,
      });
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addNewTask = createAsyncThunk(
  'task/addNewTask',
  async ({ title, description, createdBy, listId }, { rejectWithValue }) => {
    try {
      return await addTask(title, description, createdBy, listId);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getTasks = createAsyncThunk('task/getTasks', async (thunkAPI) => {
  try {
    return await getTaskList();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const delTask = createAsyncThunk(
  'task/delTask',
  async (taskId, { rejectWithValue }) => {
    try {
      return await deleteTask(taskId);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    resetReducerTask: (state) => {
      state.isLoadingAddNewTask = false;
      state.isErrorAddNewTask = false;
      state.isSuccessAddNewTask = false;
      state.messageAddNewTask = '';
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
      state.isLoadingAddNewList = false;
      state.isErrorAddNewList = false;
      state.isSuccessAddNewList = false;
      state.messageAddNewList = '';
      state.isLoadingGetList = false;

      state.isErrorGetList = false;
      state.isSuccessGetList = false;
      state.messageGetList = '';
      state.isSuccessEditCard = false;
      state.isLoadingEditCard = false;
      state.isErrorEditCard = false;
      state.messageEditCard = '';

      state.isLoadingDelTask = false;
      state.isSuccessDelTask = false;
      state.messageDelTask = '';
      state.isErrorDelTask = false;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(addNewTask.pending, (state) => {
        state.isLoadingAddNewTask = true;
      })
      .addCase(addNewTask.fulfilled, (state, action) => {
        state.isLoadingAddNewTask = false;
        state.isSuccessAddNewTask = true;
        // state.eventList = action.payload.createdEvent;
        state.messageAddNewTask = action.payload.message;
      })
      .addCase(addNewTask.rejected, (state, action) => {
        state.isLoadingAddNewTask = false;
        state.isErrorAddNewTask = true;
        state.messageAddNewTask = action.payload.message;
      })

      .addCase(addNewList.pending, (state) => {
        state.isLoadingAddNewList = true;
      })
      .addCase(addNewList.fulfilled, (state, action) => {
        state.isLoadingAddNewList = false;
        state.isSuccessAddNewList = true;
        // state.eventList = action.payload.createdEvent;
        state.messageAddNewList = action.payload.message;
      })
      .addCase(addNewList.rejected, (state, action) => {
        state.isLoadingAddNewList = false;
        state.isErrorAddNewList = true;
        state.messageAddNewList = action.payload.message;
      })

      .addCase(getTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.taskList = action.payload;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
        state.taskList = null;
      })
      .addCase(getLists.pending, (state) => {
        state.isLoadingGetList = true;
      })
      .addCase(getLists.fulfilled, (state, action) => {
        state.isLoadingGetList = false;
        state.isSuccessGetList = true;
        state.list = action.payload;
      })
      .addCase(getLists.rejected, (state, action) => {
        state.isLoadingGetList = false;
        state.isErrorGetList = true;
        state.messageGetList = action.payload.message;
        state.list = null;
      })
      .addCase(editCard.pending, (state) => {
        state.isLoadingEditCard = true;
      })
      .addCase(editCard.fulfilled, (state, action) => {
        state.isLoadingEditCard = false;
        state.isSuccessEditCard = true;
        state.messageEditCard = action.payload.message;
      })
      .addCase(editCard.rejected, (state, action) => {
        state.isLoadingEditCard = false;
        state.isErrorEditCard = true;
        state.messageEditCard = action.payload.message;
      })
      .addCase(delTask.pending, (state) => {
        state.isLoadingDelTask = true;
      })
      .addCase(delTask.fulfilled, (state, action) => {
        state.isLoadingDelTask = false;
        state.isSuccessDelTask = true;
        state.messageDelTask = action.payload.message;
      })
      .addCase(delTask.rejected, (state, action) => {
        state.isLoadingDelTask = false;
        state.isErrorDelTask = true;
        state.messageDelTask = action.payload.message;
      });
  },
});

export const { resetReducerTask } = taskSlice.actions;
export default taskSlice.reducer;
