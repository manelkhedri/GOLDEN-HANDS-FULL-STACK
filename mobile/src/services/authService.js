import { API_URL } from './api';

// Send registration information to the backend
export async function registerUser(userData) {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Registration failed.');
  }

  return data;
}

// Send login credentials to the backend
export async function loginUser(userData) {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Login failed.');
  }

  return data;
}

// Fetch the authenticated user's profile
export async function getCurrentUser(token) {
  const response = await fetch(`${API_URL}/api/auth/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to load user profile.');
  }

  return data.user;
}