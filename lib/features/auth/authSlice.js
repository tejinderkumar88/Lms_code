import config from '@/lib/config';
import { tostifyAlert } from '@/lib/utils';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const registerUserData = createAsyncThunk('auth/authSlice', async (data) => {
 console.log(data)
  try {

    const response = await axios.post(
      `${config.baseURL}/register`, data
    );
    return response.data;
  } catch (error) {
    const message = error.response && error.response.data;
    return message;
  }
});

export const loginUserData = createAsyncThunk('auth/authSlice', async (data) => {
  console.log("data","data",data)
  try {
    const response = await axios.post(
      `${config.baseURL}/login`, data
    );
    return response.data;
  } catch (error) {
    const message = error.response && error.response.data;
    return message;
  }
});

export const googleLogin = createAsyncThunk('auth/googlelogin', async (userData) => {
  try {
    // Make a POST request to your backend API
    const response = await axios.post(
        `${config.baseURL}/login/google/student/`,
        userData, // Use formData instead of userData
        {
          headers: {
          ...config.headers,
         
        } // Pass the headers from config
        });
    console.log(response.data,"&&&&&&&&&&&&&&"); // Assuming your API responds with some data
    return response.data
} catch (error) {
    console.error('Error sending user data to backend:', error);
    return error;
    // Handle error as per your application's requirement
}
});

export const googleLoginTutor = createAsyncThunk('auth/googlelogintutor', async (userData) => {
  try {
    // Make a POST request to your backend API
    const response = await axios.post(
        `${config.baseURL}/login/google/tutor/`,
        userData, // Use formData instead of userData
        {
          headers: {
          ...config.headers,
         
        } // Pass the headers from config
        });
    
    return response.data
} catch (error) {
    console.error('Error sending user data to backend:', error);
    return error;
    // Handle error as per your application's requirement
}
});


export const studentLoginWithGoodle = createAsyncThunk('auth/studentlogin', async (code) => {
  console.log(code)
  try {
    const response = await axios.post(
      `${config.baseURL}/login/google/student`, code, {
        headers: {
          ...config.headers,
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        } // Pass the headers from config
      }
    );
    return response.data;
  } catch (error) {
    return error;
  }
});

const initialState = {
  registerUserData: null,
  loginUserData: null,
  loading: false,
  error: null,
}

const registerSlice = createSlice({
  name: 'registerUserData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
      })
      .addCase(registerUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(studentLoginWithGoodle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(studentLoginWithGoodle.fulfilled, (state, action) => {
        state.loading = false;
        state.studentData = action.payload;
      })
      .addCase(studentLoginWithGoodle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(googleLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.loginData = action.payload;
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(googleLoginTutor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleLoginTutor.fulfilled, (state, action) => {
        state.loading = false;
        state.loginData = action.payload;
      })
      .addCase(googleLoginTutor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

const loginSlice = createSlice({
  name: 'loginUserData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
      })
      .addCase(loginUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const registerReducer = registerSlice.reducer;
export const loginReducer = loginSlice.reducer;
