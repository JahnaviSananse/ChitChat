import { AsyncStorage } from "react-native";
import * as API from "../../api/auth";
import * as CONSTANT from "../../constants/constant";
import * as TYPE from "../types/auth";

export const setDummyLogin = (login, data) => async (dispatch, store) => {
  dispatch({
    type: TYPE.SET_DUMMY_LOGIN,
    payload: login,
  });
  dispatch({
    type: TYPE.SET_USER_DATA,
    payload: data,
  });
};

export const setToken = (token) => async (dispatch, store) => {
  dispatch({
    type: TYPE.SET_TOKEN,
    payload: token,
  });
};

export const doLogin = (email, password) => async (dispatch, store) => {
  try {
    dispatch({ type: TYPE.LOGIN_REQUEST });
    const data = await API.login({ email, password });
    console.log("DAta", data);
    if (data.code === "1") {
      AsyncStorage.setItem(CONSTANT.USER_DATA, JSON.stringify(data.data));
      AsyncStorage.setItem(CONSTANT.ACCESS_TOKEN, data.data?.token);
      dispatch({
        type: TYPE.LOGIN_SUCCESS,
        payload: data.data,
      });
    }
  } catch (error) {
    dispatch({
      type: TYPE.LOGIN_ERROR,
      payload: error,
    });
  }
};

export const sendOTP = (request) => async (dispatch, store) => {
  try {
    dispatch({ type: TYPE.SEND_OTP_REQUEST });
    const data = await API.sendOTP(request);
    console.log("SEND OTP Res", data);
    if (data.code === "1") {
      alert(data.message);
      dispatch({
        type: TYPE.SEND_OTP_SUCCESS,
        payload: data,
      });
    } else {
      alert(data.message);
    }
    //otp
  } catch (error) {
    console.log("SEND OTP Errr", error);
    dispatch({
      type: TYPE.SEND_OTP_ERROR,
      payload: error,
    });
  }
};

export const verifyOTP = (request) => async (dispatch, store) => {
  try {
    dispatch({ type: TYPE.VERIFY_OTP_REQUEST });
    const data = await API.verifyOTP(request);
    console.log("VERIFY OTP Res", data);
    if (data.code === "1") {
      alert(data.message);
      dispatch({
        type: TYPE.VERIFY_OTP_SUCCESS,
        payload: data,
      });
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.log("VERIFY OTP Errr", error);
    dispatch({
      type: TYPE.VERIFY_OTP_ERROR,
      payload: error,
    });
  }
};

export const doSignup = (request) => async (dispatch, store) => {
  try {
    dispatch({ type: TYPE.SIGNUP_REQUEST });
    const data = await API.signup(request);
    console.log("SignUP DSata", data);
    dispatch({
      type: TYPE.SIGNUP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log("Signup Errr", error);
    dispatch({
      type: TYPE.SIGNUP_ERROR,
      payload: error,
    });
  }
};

export const editProfile = (request, token, userData) => async (
  dispatch,
  store
) => {
  try {
    dispatch({ type: TYPE.EDIT_PROFILE_REQUEST });
    const data = await API.editProfile(request, token);
    console.log("Edit Profile DSata", data);
    if (data.code === "1") {
      alert(data.message);
      dispatch({
        type: TYPE.EDIT_PROFILE_SUCCESS,
        payload: userData,
      });
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.log("Edit Profile Errr", error);
    dispatch({
      type: TYPE.EDIT_PROFILE_ERROR,
      payload: error,
    });
  }
};

export const clearSignupData = () => async (dispatch, store) => {
  dispatch({
    type: TYPE.SIGNUP_DATA_CLEAR,
  });
};

export const clearLoginData = () => async (dispatch, store) => {
  dispatch({
    type: TYPE.LOGIN_DATA_CLEAR,
  });
};

export const verifyCode = (request, param) => async (dispatch, store) => {
  try {
    dispatch({ type: TYPE.VERIFY_REQUEST });
    console.log("Request", request);
    const data = await API.verify(request);
    data.email = request.email;

    if (!param) {
      dispatch({
        type: TYPE.VERIFY_SUCCESS_SIGNUP,
        payload: data,
      });
      if (data && data.data.email_verified) {
        // console.log('Aayu');
        AsyncStorage.setItem(CONSTANT.USER_DATA, JSON.stringify(data));
        AsyncStorage.setItem(
          CONSTANT.ACCESS_TOKEN,
          data.data.token.access_token
        );
        AsyncStorage.setItem(
          CONSTANT.REFRESH_TOKEN,
          data.data.token.refresh_token
        );
      }
    } else {
      dispatch({
        type: TYPE.VERIFY_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: TYPE.VERIFY_ERROR,
      payload: error,
    });
  }
};
export const logout_user = (token) => async (dispatch, store) => {
  try {
    dispatch({ type: TYPE.LOGOUT_REQUEST });
    const data = await API.logout(token);
    if (data.code === "1") {
      AsyncStorage.removeItem(CONSTANT.USER_DATA);
      AsyncStorage.removeItem(CONSTANT.ACCESS_TOKEN);
      // ROUTER.replace("Login", {});
    }
    dispatch({
      type: TYPE.LOGOUT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    AsyncStorage.removeItem(CONSTANT.USER_DATA);
    AsyncStorage.removeItem(CONSTANT.ACCESS_TOKEN);
    // ROUTER.replace("Login", {});
    dispatch({
      type: TYPE.LOGOUT_ERROR,
      payload: error,
    });
  }
};
