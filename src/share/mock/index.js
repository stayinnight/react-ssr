import axios from 'axios'

export const fetchData = (page) => {
    return axios.get(`http://localhost:3000/api/get_data/${page}`)
} 