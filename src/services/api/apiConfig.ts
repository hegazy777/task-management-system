export const baseURL = "https://upskilling-egypt.com:3003/api/v1/";
export const imageURL = "https://upskilling-egypt.com:3003/";

export const users_endpoints = {
  LOGIN: `/Users/Login`,
  REGISTER: `/Users/Register`,
  VERIFY: `/Users/Verify`,
  RESET_REQUEST: `/Users/Reset/Request`,
  RESET: `/Users/Reset`,
  GET_USER: `/Users/currentUser/`,
  GET_ALL_USERS: `/Users/`,
  DELETE_USER: (id: number) => `/Users/${id}`,
  CHANGE_PASSWORD: `/Users/ChangePassword`,
  UPDATE_USER: `/Users/`,
};

export const projects_endpoints = {
  GET_ALL_PROJECT: `/Project/`,
  UPDATE_PROJECT: (id: number) => `/Project/${id}`,
  DELETE_PROJECT: (id: number) => `/Project/${id}`,
  ADD_PROJECT: `/Category`,
};
