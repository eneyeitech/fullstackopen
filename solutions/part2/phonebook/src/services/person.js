import axios from "axios";
//const baseUrl = "http://localhost:3001/persons";
const baseUrl = "/api/persons";

export const getAll = () => {
  return axios.get(baseUrl).then((response) => {
    return response.data;
  });
};

export const create = (newPerson) => {
  return axios.post(baseUrl, newPerson).then((response) => response.data);
};

export const update = (id, updatedPerson) => {
    return axios.put(`${baseUrl}/${id}`, updatedPerson).then((response) => response.data);
};

export const deletePerson = (id) => {
    return axios.delete(`${baseUrl}/${id}`).then((response) => response.data);
};
