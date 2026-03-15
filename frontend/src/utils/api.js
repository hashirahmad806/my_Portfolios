import axios from 'axios'

const BASE = import.meta.env.VITE_API_URL || '/api'

const api = axios.create({
  baseURL: BASE,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.response.use(
  r => r,
  err => Promise.reject(err)
)

export const contactAPI  = { send: d => api.post('/contact', d) }
export const projectsAPI = { getAll: (cat) => api.get('/projects', { params: { category: cat } }) }
export default api
