import axios from 'axios'
const baseURL = '/api/persons'

export const getAll = () => {
  return axios
    .get(baseURL)
    .then(({ data }) => {
      return data
    })
    .catch(err => console.log('err', err))
}

export const createNew = newPerson => {
  return axios.post(baseURL, newPerson)
}

export const deletePerson = id => {
  return axios.delete(`${baseURL}/${id}`)
}

export const updatePerson = (id, updatedPerson) => {
  return axios.put(`${baseURL}/${id}`, updatedPerson).then(res => res.data)
}
