import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

export const insertItem = (payload) => api.post(`/api/item`, payload);
export const updateItemById = (id, payload) =>
  api.put(`/api/item/${id}`, payload);
export const deleteItemById = (id) => api.delete(`/api/item/${id}`);
export const getItemById = (id) => api.get(`/api/item/${id}`);
export const getAllItems = () => api.get(`/api/items`);

export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) return JSON.parse(userStr);
  return null;
};

export const authHeader = () => {
  const accessToken = localStorage.getItem("user");
  let user = null;
  if (accessToken) user = JSON.parse(accessToken);
  if (user) {
    return {
      authentication: accessToken,
    };
  } else {
    return {
      authentication: null,
    };
  }
};

api.interceptors.request.use(
  (config) => {
    const headers = apis.authHeader();
    config.headers = headers;
    return config;
  },
  (error) => {
    console.log(error);
  }
);

const apis = {
  insertItem,
  getAllItems,
  updateItemById,
  deleteItemById,
  getItemById,
  getCurrentUser,
  authHeader,
};

export default apis;
