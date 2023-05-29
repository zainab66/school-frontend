import Axios from 'axios';

const baseURL = 'http://localhost:3001/api';
//'https://xi-team-api.onrender.com/api';
// || 'http://localhost:3001/api';

// Add Class
export const addClassAction = async (name, teacherName, gradeId) => {
  const response = await Axios.post(
    `${baseURL}/school/class/addClass`,
    { name, teacherName, gradeId },
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

export const getClassListAction = async () => {
  const response = await Axios.get(`${baseURL}/school/class/getClasses`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
    },
  });
  return response.data.classes;
};

export const deleteClassAction = async (classId) => {
  const response = await Axios.delete(
    `${baseURL}/school/class/delete/${classId}`,
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
