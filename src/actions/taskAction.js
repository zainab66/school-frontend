import Axios from 'axios';
const baseURL = 'https://xi-team-api.onrender.com/api';
export const addList = async (title, createdBy) => {
  const response = await Axios.post(
    `${baseURL}/school/task/addList`,
    {
      title,

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

export const getList = async () => {
  const response = await Axios.get(`${baseURL}/school/task/getLists`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
    },
  });
  return response.data.lists;
};

export const addTask = async (title, description, createdBy, listId) => {
  const response = await Axios.post(
    `${baseURL}/school/task/addTask`,
    {
      title,
      listId,
      description,
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

export const getTaskList = async () => {
  const response = await Axios.get(`${baseURL}/school/task/getTasks`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
    },
  });
  return response.data.tasks;
};

export const editCards = async (card) => {
  const response = await Axios.patch(`${baseURL}/task/${card.cardId}`, card, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
    },
  });
  return response.data;
};

export const deleteTask = async (taskId) => {
  console.log('taskId', taskId);

  const response = await Axios.delete(
    `${baseURL}/school/task/delete/${taskId}`,

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
