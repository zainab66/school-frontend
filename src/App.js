import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './screens/Main';
import Dashboard from './screens/Dashboard';
import Login from './screens/Login';
import Register from './screens/Register';
import PrivateRoute from './routes/PrivateRoute';
import Teachers from './screens/Teachers';
import Profile from './screens/Profile';
import Students from './screens/Students';
import GradesAndClasses from './screens/GradesAndClasses';
import Calender from './screens/Calender';
import Tasks from './screens/Tasks';
import ForgetPassword from './screens/ForgetPassword';
import ResetPassword from './screens/ResetPassword';
import TeacherDashboard from './screens/TeacherDashboard';
import ActivateUser from './screens/ActivateUser';
import TeacherMain from './screens/TeacherMain';
import TeacherProfile from './screens/TeacherProfile';
import Grade from './screens/Grade';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PrivateRoute role="principle" />}>
            <Route path="/" element={<Dashboard />}>
              <Route path="" element={<Main />} />
              <Route path="teachers" element={<Teachers />} />
              <Route path="profile" element={<Profile />} />
              <Route path="students" element={<Students />} />
              <Route path="grades&classes" element={<GradesAndClasses />} />
              <Route path="grades" element={<Grade />} />
              <Route path="calender" element={<Calender />} />
              <Route path="tasks" element={<Tasks />} />
            </Route>
          </Route>
          <Route path="/activate/:token" element={<ActivateUser />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route path="/resetpassword/:token" element={<ResetPassword />} />

          <Route
            path="/teacher/dashboard"
            element={<PrivateRoute role="teacher" />}
          >
            <Route path="/teacher/dashboard" element={<TeacherDashboard />}>
              <Route path="" element={<TeacherMain />} />
              <Route path="TeacherProfile" element={<TeacherProfile />} />
            </Route>{' '}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
