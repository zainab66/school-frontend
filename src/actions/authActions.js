import Axios from 'axios';

const baseURL = 'https://xi-team-api.onrender.com/api';
// || 'http://localhost:3001/api';

// Login User
export const loginAction = async (email, password) => {
  const response = await Axios.post(`${baseURL}/school/users/login`, {
    email,
    password,
  });
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  return response.data;
};

// Register User
export const registerAction = async (
  name,
  email,
  password,
  role,
  dashboardName
) => {
  const response = await Axios.post(`${baseURL}/school/users/register`, {
    name,
    email,
    password,
    role,
    dashboardName,
  });

  return response.data;
};

// Logout user
export const logoutAction = () => {
  localStorage.removeItem('user');
};

export const getUserProfileAction = async (id) => {
  const response = await Axios.get(
    `${baseURL}/school/users/getUserProfile/${id}`,
    {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('user')).token
        }`,
      },
    }
  );
  return response.data;
};

export const editUserProfileAction = async (formData) => {
  const response = await Axios.put(
    `${baseURL}/school/users/editUserProfile`,
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  );
  return response.data;
};

export const editTeacherProfileAction = async (formData) => {
  const response = await Axios.put(
    `${baseURL}/school/users/teacher/editTeacherProfile`,
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  );
  return response.data;
};

export const forgotPassword = async (email) => {
  const response = await Axios.put(`${baseURL}/school/users/forget-password`, {
    email,
  });
  return response.data;
};

export const resetPasswordUser = async (token, password) => {
  const response = await Axios.put(`${baseURL}/school/users/reset-password`, {
    token,
    password,
  });
  return response.data;
};
