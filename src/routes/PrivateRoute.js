import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
const PrivateRoute = (props) => {
  const { user } = useSelector((state) => state.auth);
  if (props.role) {
    return user ? (
      props.role === user.role && props.role === 'principle' ? (
        <Outlet />
      ) : props.role === user.role && props.role === 'teacher' ? (
        <Navigate to="/teacher/dashboard" />
      ) : (
        <Navigate to="/login" />
      )
    ) : (
      <Navigate to="/login" />
    );
  } else {
    return user ? <Outlet /> : <Navigate to="/login" />;
  }
};

// const PrivateRoute = (props) => {
//   const { user } = useSelector((state) => state.auth);
//   if (user && props.type) {
//     if (
//       props.type === 'school' &&
//       props.type === user.type &&
//       props.role === 'principle' &&
//       props.role === user.role
//     ) {
//       return <Outlet />;
//     } else {
//       return <Navigate to="/login" />;
//     }
//   } else {
//     return <Navigate to="/login" />;
//   }
// };

export default PrivateRoute;
