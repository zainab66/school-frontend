import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  addEvent,
  getEventList,
  deleteEvent,
  editEvent,
} from '../actions/eventAction';

const initialState = {
  eventList: [],

  isErrorAddNewEvent: false,
  isSuccessAddNewEvent: false,
  messageAddNewEvent: '',
  isLoadingAddNewEvent: false,

  isLoadingGetEvents: false,
  isSuccessGetEvents: false,
  messageGetEvents: '',
  isErrorGetEvents: false,

  messageDelEvent: '',
  isErrorDelEvent: false,
  isSuccessDelEvent: false,
  isLoadingDelEvent: false,

  isErrorEditEvent: false,
  isSuccessEditEvent: false,
  isLoadingEditEvent: false,
  messageEditEvent: '',
};

export const addNewEvent = createAsyncThunk(
  'event/addNewEvent',
  async (
    { eventTitle, eventDescription, startDate, endDate },
    { rejectWithValue }
  ) => {
    try {
      return await addEvent(eventTitle, eventDescription, startDate, endDate);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getEvents = createAsyncThunk(
  'event/getEvents',
  async (rejectWithValue) => {
    try {
      return await getEventList();
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const delEvent = createAsyncThunk(
  'event/delEvent',
  async (eventId, { rejectWithValue }) => {
    try {
      return await deleteEvent(eventId);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editEvents = createAsyncThunk(
  'event/editEvents',
  async (
    { eventTitle, eventDescription, startDate, endDate, eventId },
    { rejectWithValue }
  ) => {
    try {
      return await editEvent({
        eventTitle,
        eventDescription,
        startDate,
        endDate,
        eventId,
      });
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    resetReducerEvent: (state) => {
      state.isErrorAddNewEvent = false;
      state.isSuccessAddNewEvent = false;
      state.messageAddNewEvent = '';
      state.isLoadingGetEvents = false;
      state.isErrorGetEvents = false;
      state.isSuccessGetEvents = false;
      state.messageGetEvents = '';
      state.isLoadingAddNewEvent = false;
      state.isErrorDelEvent = false;
      state.isSuccessDelEvent = false;
      state.isLoadingDelEvent = false;
      state.messageDelEvent = '';

      state.isErrorEditEvent = false;
      state.isSuccessEditEvent = false;
      state.isLoadingEditEvent = false;
      state.messageEditEvent = '';
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(addNewEvent.pending, (state) => {
        state.isLoadingAddNewEvent = true;
      })
      .addCase(addNewEvent.fulfilled, (state, action) => {
        state.isLoadingAddNewEvent = false;
        state.isSuccessAddNewEvent = true;
        // state.eventList = action.payload.createdEvent;
        state.messageAddNewEvent = action.payload.message;
      })
      .addCase(addNewEvent.rejected, (state, action) => {
        state.isLoadingAddNewEvent = false;
        state.isErrorAddNewEvent = true;
        state.messageAddNewEvent = action.payload.message;
      })
      .addCase(getEvents.pending, (state) => {
        state.isLoadingGetEvents = true;
      })
      .addCase(getEvents.fulfilled, (state, action) => {
        state.isLoadingGetEvents = false;
        state.isSuccessGetEvents = true;
        state.eventList = action.payload;
      })
      .addCase(getEvents.rejected, (state, action) => {
        state.isLoadingGetEvents = false;
        state.isErrorGetEvents = true;
        state.messageGetEvents = action.payload;
        state.eventList = null;
      })
      .addCase(delEvent.pending, (state) => {
        state.isLoadingDelEvent = true;
      })
      .addCase(delEvent.fulfilled, (state, action) => {
        state.isSuccessDelEvent = true;
        state.messageDelEvent = action.payload.message;
      })
      .addCase(delEvent.rejected, (state, action) => {
        state.isErrorDelEvent = true;
        state.messageDelEvent = action.payload.message;
      })
      .addCase(editEvents.pending, (state) => {
        state.isLoadingEditEvent = true;
      })
      .addCase(editEvents.fulfilled, (state, action) => {
        state.isLoadingEditEvent = false;
        state.isSuccessEditEvent = true;
        state.messageEditEvent = action.payload.message;
      })
      .addCase(editEvents.rejected, (state, action) => {
        state.isLoadingEditEvent = false;
        state.isErrorEditEvent = true;
        state.messageEditEvent = action.payload.message;
      });
  },
});

export const { resetReducerEvent } = eventSlice.actions;
export default eventSlice.reducer;
