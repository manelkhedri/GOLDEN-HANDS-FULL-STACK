import * as SecureStore from 'expo-secure-store';

// Save the authentication token securely
export async function saveToken(token) {
  await SecureStore.setItemAsync('userToken', token);
}

// Retrieve the saved authentication token
export async function getToken() {
  return await SecureStore.getItemAsync('userToken');
}

// Remove the authentication token during logout
export async function deleteToken() {
  await SecureStore.deleteItemAsync('userToken');
}