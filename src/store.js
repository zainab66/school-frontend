import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice';
import teacherReducer from './reducers/teacherSlice';
import classReducer from './reducers/classSlice';
import studentReducer from './reducers/studentSlice';
import eventReducer from './reducers/eventSlice';
import taskReducer from './reducers/taskSlice';
import gradeReducer from './reducers/gradeSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    teacher: teacherReducer,
    class: classReducer,
    student: studentReducer,
    event: eventReducer,
    task: taskReducer,
    grade: gradeReducer,
  },
});

export default store;
