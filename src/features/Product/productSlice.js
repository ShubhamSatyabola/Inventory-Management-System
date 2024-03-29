import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteProduct, fetchProducts, generateQr, scanQr } from './productAPI';

const initialState = {
  component : [],
  status: 'idle',
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

 

export const generateQrAsync = createAsyncThunk(
  'create/Qr',
  async (data) => {
    const response = await generateQr(data);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchProductsAsync = createAsyncThunk(
  'fetch/products',
  async () => {
    const response = await fetchProducts();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const scanQrAsync = createAsyncThunk(
  "scan/products",
  async (data) => {
    const response = await scanQr(data);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const deleteProductAsync = createAsyncThunk("delete/products", async (data) => {
  const response = await deleteProduct(data)
  // The value we return becomes the `fulfilled` action payload
  return response.data;
});

export const productSlice = createSlice({
  name: 'product',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(generateQrAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(generateQrAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.component.push(action.payload);
      })
      .addCase(fetchProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.component = action.payload;
      })
      .addCase(scanQrAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(scanQrAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const Index = state.component.findIndex(
          (item) => item.id === action.payload.id
        );
        state.component[Index] = action.payload;
      })
      .addCase(deleteProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const Index = state.component.findIndex(
          (item) => item.id === action.payload.id
        );
        state.component.splice(Index, 1);      });
  },
});


export const selectComponent = (state) => state.product.component;


// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.


export default productSlice.reducer;
