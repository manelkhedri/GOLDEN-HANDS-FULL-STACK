
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'http://localhost:3000/api/products';
const SERVER_URL = 'http://localhost:3000';

// Convert backend product to frontend format
const formatProduct = (product) => ({
  ...product,
  id: product._id,
  image: product.image?.startsWith('http')
    ? product.image
    : `${SERVER_URL}${product.image}`
});

// Fetch all products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(
          data.message || 'Failed to fetch products'
        );
      }

      return data.map(formatProduct);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Add product with image
export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (productData, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem('token');
      const formData = new FormData();

      Object.entries(productData).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          formData.append(key, value);
        }
      });

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(
          data.message || 'Failed to add product'
        );
      }

      return formatProduct(data.product);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Update product with optional image
export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem('token');
      const formData = new FormData();

      Object.entries(productData).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          formData.append(key, value);
        }
      });

      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(
          data.message || 'Failed to update product'
        );
      }

      return formatProduct(data.product);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Delete product
export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (productId, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem('token');

      const response = await fetch(`${API_URL}/${productId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(
          data.message || 'Failed to delete product'
        );
      }

      return productId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial state
const initialState = {
  items: [],
  status: 'idle',
  error: null
};

// Products slice
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })

      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })

      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Add product
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.error = null;
      })

      .addCase(addProduct.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Update product
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (product) => product.id === action.payload.id
        );

        if (index !== -1) {
          state.items[index] = action.payload;
        }

        state.error = null;
      })

      .addCase(updateProduct.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Delete product
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (product) => product.id !== action.payload
        );

        state.error = null;
      })

      .addCase(deleteProduct.rejected, (state, action) => {
        state.error = action.payload;
      });
  }
});

export default productsSlice.reducer;



