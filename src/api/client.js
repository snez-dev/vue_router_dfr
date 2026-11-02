/**
 * API Client for Django REST Framework backend
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Get auth token from localStorage
  getToken() {
    return localStorage.getItem('auth_token');
  }

  // Get headers with authentication
  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };
    
    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
  }

  // Handle response
  async handleResponse(response) {
    const data = await response.json();
    
    if (!response.ok) {
      const error = new Error(data.detail || data.error || 'Произошла ошибка');
      error.response = data;
      throw error;
    }
    
    return data;
  }

  // GET request
  async get(endpoint) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });
    return this.handleResponse(response);
  }

  // POST request
  async post(endpoint, data) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  }

  // PUT request
  async put(endpoint, data) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  }

  // PATCH request
  async patch(endpoint, data) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'PATCH',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  }

  // DELETE request
  async delete(endpoint) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });
    return this.handleResponse(response);
  }

  // Upload file
  async upload(endpoint, formData) {
    const token = this.getToken();
    const headers = {};
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers,
      body: formData,
    });
    return this.handleResponse(response);
  }
}

export const apiClient = new ApiClient();

// Auth API
export const authAPI = {
  login: (credentials) => apiClient.post('/auth/login/', credentials),
  register: (data) => apiClient.post('/auth/register/', data),
  logout: (refreshToken) => apiClient.post('/auth/logout/', { refresh_token: refreshToken }),
  refreshToken: (refreshToken) => apiClient.post('/auth/refresh/', { refresh: refreshToken }),
  getProfile: () => apiClient.get('/auth/profile/'),
  updateProfile: (data) => apiClient.patch('/auth/profile/', data),
  changePassword: (data) => apiClient.post('/auth/change-password/', data),
};

// Users API
export const usersAPI = {
  list: () => apiClient.get('/users/'),
  get: (id) => apiClient.get(`/users/${id}/`),
  create: (data) => apiClient.post('/users/create/', data),
  update: (id, data) => apiClient.put(`/users/${id}/update/`, data),
  delete: (id) => apiClient.delete(`/users/${id}/delete/`),
};

// Reports API
export const reportsAPI = {
  list: () => apiClient.get('/reports/'),
  get: (id) => apiClient.get(`/reports/${id}/`),
  create: (data) => apiClient.post('/reports/create/', data),
  update: (id, data) => apiClient.put(`/reports/${id}/update/`, data),
  delete: (id) => apiClient.delete(`/reports/${id}/delete/`),
  upload: (formData) => apiClient.upload('/reports/create/', formData),
};
