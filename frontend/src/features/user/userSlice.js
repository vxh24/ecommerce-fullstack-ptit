import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "./userService";
import { toast } from "react-toastify"
export const createUser = createAsyncThunk("auth/register", async (userData, thunkAPI) => {
  try {

    return await authService.createUser(userData)
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
export const handleLogin = createAsyncThunk("auth/login", async (userData, thunkAPI) => {
  try {
    return await authService.handleLogin(userData)
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
export const googlelogin = createAsyncThunk("auth/google", async (userData, thunkAPI) => {
  try {
    return await authService.gglogin(userData)
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
export const forgotPass = createAsyncThunk("auth/forgot", async (data, thunkAPI) => {
  try {
    return await authService.forgotPassword(data)
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
export const ResetPassWord = createAsyncThunk("auth/reset", async (data, thunkAPI) => {
  try {
    return await authService.resetPass(data)
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
export const getUserProductWishlist = createAsyncThunk("user/wishlist", async (thunkAPI) => {
  try {
    return await authService.getWishlist()
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
export const AddProdToCart = createAsyncThunk("user/cart/add", async (product, thunkAPI) => {
  try {
    return await authService.AddToCart(product);
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
export const getUserCart = createAsyncThunk("user/cart/get", async (thunkAPI) => {
  try {
    return await authService.getCart();
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
export const cashOrderUser = createAsyncThunk("user/cart/order", async (data, thunkAPI) => {
  try {
    return await authService.cashOrder(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
export const getOrderUser = createAsyncThunk("user/orders", async (thunkAPI) => {
  try {
    return await authService.getOrder();
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
const getCustomerfromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;
const initialState = {
  user: getCustomerfromLocalStorage,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ""
}
export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createUser.pending, (state) => {
      state.isLoading = true;
    }).addCase(createUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.createUser = action.payload;
      if (state.isSuccess === true) {
        toast.info("User Create Successfully");
        console.log("User Create Successfullyaaaa")
      }
    }).addCase(createUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
      if (state.isError === true) {
        toast.error(action.error)
      }
    }).addCase(handleLogin.pending, (state) => {
      state.isLoading = true;
    }).addCase(handleLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.user = action.payload;

      if (state.isSuccess === true) {
        localStorage.setItem("token", action.payload.access_token)
        toast.success("Login Successfully");
      }
    }).addCase(handleLogin.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
      if (state.isError === true) {
        toast.error(action.error)
      }
    })
      .addCase(googlelogin.pending, (state) => {
        state.isLoading = true;
      }).addCase(googlelogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = action.payload;

        if (state.isSuccess === true) {
          localStorage.setItem("token", action.payload.access_token)
          toast.success("Login With Google Successfully");
        }
      }).addCase(googlelogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error)
        }
      })
      .addCase(getUserProductWishlist.pending, (state) => {
        state.isLoading = true;

      }).addCase(getUserProductWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.wishlist = action.payload;
      }).addCase(getUserProductWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error)
        }
      })
      .addCase(AddProdToCart.pending, (state) => {
        state.isLoading = true;

      }).addCase(AddProdToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cartProduct = action.payload;
        if (state.isSuccess === true) {
          toast.success("Add Product To Cart Successfully!")
        }
      }).addCase(AddProdToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error("ko đc")
        }
      })
      .addCase(getUserCart.pending, (state) => {
        state.isLoading = true;

      }).addCase(getUserCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cartUser = action.payload;
      }).addCase(getUserCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error("ko đc")
        }
      })
      .addCase(forgotPass.pending, (state) => {
        state.isLoading = true;

      }).addCase(forgotPass.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.token = action.payload;
        if (state.isSuccess === true) {
          toast.success("Email Send Successfully!")
        }
      }).addCase(forgotPass.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error("ko đc")
        }
      })
      .addCase(ResetPassWord.pending, (state) => {
        state.isLoading = true;

      }).addCase(ResetPassWord.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.pass = action.payload;
        if (state.isSuccess === true) {
          toast.success("Password Update Successfully!")
        }
      }).addCase(ResetPassWord.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error("ko đc")
        }
      })
      .addCase(cashOrderUser.pending, (state) => {
        state.isLoading = true;

      }).addCase(cashOrderUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.order = action.payload;
        if (state.isSuccess === true) {
          toast.success("Order Created Successfully!")
        }
      }).addCase(cashOrderUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error("ko đc")
        }
      })
      .addCase(getOrderUser.pending, (state) => {
        state.isLoading = true;

      }).addCase(getOrderUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.orders = action.payload;
      }).addCase(getOrderUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error("Fail")
        }
      })
  }
})
export default authSlice.reducer;