import Axios from 'axios';

const baseURL = 'https://xi-team-api.onrender.com/api';
// || 'http://localhost:3001/api';

// Add Teacher
export const addTeacherAction = async (
  email,
  firstName,
  lastName,
  role,
  createdBy
) => {
  const response = await Axios.post(
    `${baseURL}/school/teacher/addTeacher`,
    {
      email,
      firstName,
      lastName,
      role,
      createdBy,
    },
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

export const activateTeacherAction = async (token) => {
  const response = await Axios.post(
    `${baseURL}/school/teacher/email-activate`,
    {
      token,
    }
  );
  return response.data;
};

export const getTeacherListAction = async () => {
  const response = await Axios.get(`${baseURL}/school/teacher/getTeachers`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
    },
  });
  return response.data.teachers;
};

export const deleteTeacherInfoAction = async (teacherId) => {
  const response = await Axios.delete(
    `${baseURL}/school/teacher/delete/${teacherId}`,
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

export const editTeacherAction = async (formData) => {
  const response = await Axios.put(`${baseURL}/school/teacher/edit`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
    },
  });
  return response.data;
};
