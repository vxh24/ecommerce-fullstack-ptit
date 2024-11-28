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
export const deleteProductfromCart = createAsyncThunk("user/removecart", async ({ productId, color }, thunkAPI) => {
  try {
    return await authService.removePfromCart({ productId, color });
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
export const updatecountCart = createAsyncThunk("user/updatecart", async ({ productId, color, newQuantity }, thunkAPI) => {
  try {
    return await authService.updateCountProduct({ productId, color, newQuantity });
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
export const createAdd = createAsyncThunk("user/address", async (data, thunkAPI) => {
  try {
    return await authService.createAddress(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
export const getAddressSlice = createAsyncThunk("user/get/address", async (thunkAPI) => {
  try {
    return await authService.getAddress();
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
export const removeAddressSlice = createAsyncThunk("user/delete/address", async (id, thunkAPI) => {
  try {
    return await authService.removeAddress(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
export const updateAddressSlice = createAsyncThunk("user/update/address", async (addressData, thunkAPI) => {
  try {
    return await authService.updateAddress(addressData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
export const changePassSlice = createAsyncThunk("user/update/pass", async (data, thunkAPI) => {
  try {
    return await authService.changePass(data);
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
        state.cartUser = action.payload;
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
      .addCase(deleteProductfromCart.pending, (state) => {
        state.isLoading = true;

      }).addCase(deleteProductfromCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.remove = action.payload;
        if (state.isSuccess === true) {
          toast.success("Xóa thành công");
        }
      }).addCase(deleteProductfromCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error("Có lỗi xảy ra")
        }
      })
      .addCase(updatecountCart.pending, (state) => {
        state.isLoading = true;

      }).addCase(updatecountCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.update = action.payload;
      }).addCase(updatecountCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error("Có lỗi xảy ra")
        }
      })
      .addCase(createAdd.pending, (state) => {
        state.isLoading = true;

      }).addCase(createAdd.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.address = action.payload;
        if (state.isSuccess === true) {
          toast.success("Thêm địa chỉ thành công");
        }
      }).addCase(createAdd.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error("Có lỗi xảy ra")
        }
      })
      .addCase(getAddressSlice.pending, (state) => {
        state.isLoading = true;

      }).addCase(getAddressSlice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.address = action.payload;
      }).addCase(getAddressSlice.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error("Có lỗi xảy ra")
        }
      })
      .addCase(updateAddressSlice.pending, (state) => {
        state.isLoading = true;

      }).addCase(updateAddressSlice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.address = action.payload;
        if (state.isSuccess === true) {
          toast.success("Cập nhật thành công");
        }
      }).addCase(updateAddressSlice.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(changePassSlice.pending, (state) => {
        state.isLoading = true;

      }).addCase(changePassSlice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.password = action.payload;
        if (state.isSuccess === true) {
          toast.success("Đổi mật khẩu thành công");
        }
      }).addCase(changePassSlice.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error("Có lỗi xảy ra")
        }
      })
  }
})
export default authSlice.reducer;