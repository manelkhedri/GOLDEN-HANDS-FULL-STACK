import { API_URL } from './api';

// Fetch all products from the backend
export async function getProducts() {
  const response = await fetch(`${API_URL}/api/products`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to load products.');
  }

  return data;
}