import axios from 'axios';

const BASE_URL = 'https://localhost:7105';

export const getTodos = async () => {
  const response = await axios.get(`${BASE_URL}/api/items`);
  return response.data;
};

export const createTodo = async (todo) => {
  const response = await axios.post(`${BASE_URL}/api/items`, todo);
  return response.data;
};

export const updateTodo = async (todo) => {
  const response = await axios.put(`${BASE_URL}/api/items/${todo.id}`, todo);
  return response.data;
};

export const deleteTodo = async (id) => {
  const response = await axios.delete(`${BASE_URL}/api/items/${id}`);
  return response.data;
};
