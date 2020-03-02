import axios from 'axios';
import { API_URL } from 'config';

export function get(url) {
  return axios
    .get(`${API_URL}${url}`)
    .then(handleResponse);
}

export function post(url, data) {
  return axios
    .post(`${API_URL}${url}`, data)
    .then(handleResponse);
}

export function put(url, data) {
  return axios
    .put(`${API_URL}${url}`, data)
    .then(handleResponse);
}

export function del(url, params) {
  return axios
    .delete(`${API_URL}${url}`)
    .then(handleResponse);
}

function handleResponse(response) {
  return response.data;
}