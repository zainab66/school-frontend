import Axios from 'axios';

const baseURL = 'https://xi-team-api.onrender.com/api';
// || 'http://localhost:3001/api';

// Add Student
export const addStudentAction = async (formData) => {
  const response = await Axios.post(
    `${baseURL}/school/student/addStudent`,
    formData,
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

export const getStudentListAction = async () => {
  const response = await Axios.get(`${baseURL}/school/student/getStudents`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
    },
  });
  return response.data.students;
};

export const deleteStudentInfoAction = async (studentId) => {
  const response = await Axios.delete(
    `${baseURL}/school/student/delete/${studentId}`,
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

export const editStudentAction = async (formData) => {
  const response = await Axios.put(
    `${baseURL}/school/student/edit/`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('user')).token
        }`,
      },
    }
  );
  return response.data;
};
