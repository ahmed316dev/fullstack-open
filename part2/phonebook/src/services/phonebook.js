import axios from 'axios'
const baseURL = process.env.REACT_APP_BASE_BACKEND_URL

export const getAll = () => {
  return axios
    .get(baseURL)
    .then(({ data }) => {
      return data
    })
    .catch(err => console.log('err', err))
}

export const createNew = newPerson => {
  return axios
    .post(baseURL, newPerson)
    .then(({ data }) => data)
    .catch(err => console.log(err))
}

export const deletePerson = id => {
  return axios.delete(`${baseURL}/${id}`)
}

export const updatePerson = (id, updatedPerson) => {
  return axios.put(`${baseURL}/${id}`, updatedPerson).then(res => res.data)
}
