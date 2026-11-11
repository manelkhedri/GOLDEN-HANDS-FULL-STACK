
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'http://localhost:3000/api/auth';

const initialState = {
  token: sessionStorage.getItem('token'),
  user: null,
  isLoggedIn: Boolean(sessionStorage.getItem('token')),
  status: 'idle',
  error: null
};

// Register a new user
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || 'Registration failed');
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Login using email and password
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || 'Login failed');
      }

      sessionStorage.setItem('token', data.token);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Get current user information
export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem('token');

      if (!token) {
        return rejectWithValue('No token found');
      }

      const response = await fetch(`${API_URL}/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || 'Failed to get user');
      }

      return data.user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    setGoogleToken: (state, action) => {
      state.token = action.payload;
      state.isLoggedIn = true;
      state.user = null;
      state.error = null;
      sessionStorage.setItem('token', action.payload);
    },

    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isLoggedIn = false;
      state.status = 'idle';
      state.error = null;
      sessionStorage.removeItem('token');
    }
  },

  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isLoggedIn = true;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Register
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })

      .addCase(registerUser.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = null;
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Current user
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
      })

      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  }
});

export const { setGoogleToken, logout } = authSlice.actions;

export default authSlice.reducer;


