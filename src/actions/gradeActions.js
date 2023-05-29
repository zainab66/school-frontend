import Axios from 'axios';

const baseURL = 'https://xi-team-api.onrender.com/api';
// || 'http://localhost:3001/api';

// Add Grade
export const addGradeAction = async (name) => {
  const response = await Axios.post(
    `${baseURL}/school/grade/addGrade`,
    { name },
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

export const getGradeListAction = async () => {
  const response = await Axios.get(`${baseURL}/school/grade/getGrades`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
    },
  });
  return response.data.grades;
};

export const deleteGradeAction = async (gradeId) => {
  const response = await Axios.delete(
    `${baseURL}/school/grade/delete/${gradeId}`,
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
