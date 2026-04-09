import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({ baseURL: API_URL, headers: { 'Content-Type': 'application/json' } });

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('janvi_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('janvi_token');
      localStorage.removeItem('janvi_user');
      window.location.href = '/auth/login';
    }
    return Promise.reject(err);
  }
);

export default api;

export const register = (data) => api.post('/auth/register', data);
export const login = (data) => api.post('/auth/login', data);
export const getMe = () => api.get('/auth/me');
export const getServices = (category) => api.get('/services', { params: category ? { category } : {} });
export const getAllServices = () => api.get('/services/all');
export const createService = (data) => api.post('/services', data);
export const updateService = (id, data) => api.put(`/services/${id}`, data);
export const deleteService = (id) => api.delete(`/services/${id}`);
export const createBooking = (data) => api.post('/bookings', data);
export const getBookings = () => api.get('/bookings');
export const updateBooking = (id, data) => api.put(`/bookings/${id}`, data);
export const getBookingStats = () => api.get('/bookings/stats');
export const getUsers = () => api.get('/users');
export const toggleUserStatus = (id, isActive) => api.put(`/users/${id}/status`, { isActive });
export const getOffers = () => api.get('/offers');
export const getAllOffers = () => api.get('/offers/all');
export const createOffer = (data) => api.post('/offers', data);
export const updateOffer = (id, data) => api.put(`/offers/${id}`, data);
export const deleteOffer = (id) => api.delete(`/offers/${id}`);
export const getGallery = () => api.get('/gallery');
export const uploadGalleryImage = (formData) => api.post('/gallery', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const deleteGalleryImage = (id) => api.delete(`/gallery/${id}`);
