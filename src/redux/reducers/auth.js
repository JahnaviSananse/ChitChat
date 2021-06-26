import * as TYPE from "../types/auth";
const initialState = {
  loading: false,
  signupData: null,
  email: null,
  signupError: null,
  resendError: null,
  loginError: null,
  verifyError: null,
  resetPassError: null,
  forgotPassError: null,
  signupSuccess: "",
  verifySuccess: "",
  resendMessage: null,
  access_token: "",
  refresh_token: "",
  userData: null,
  email_verified: null,
  verifyType: "",
  resetPasswordSuccess: "",
  isLoggedIn: false,
  sendOtp: {},
  verifyOtp: {},
};
export default (state = initialState, action) => {
  switch (action.type) {
    case TYPE.SET_DUMMY_LOGIN: {
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    }

    //set user data
    case TYPE.SET_USER_DATA: {
      return {
        ...state,
        loading: false,
        userData: action.payload,
      };
    }

    //setToken
    case TYPE.SET_TOKEN: {
      return {
        ...state,
        access_token: action.payload,
      };
    }

    //send otp
    case TYPE.SEND_OTP_REQUEST: {
      return {
        ...state,
        loading: true,
        sendOtp: {},
      };
    }
    case TYPE.SEND_OTP_SUCCESS: {
      return {
        ...state,
        loading: false,
        sendOtp: action.payload,
      };
    }
    case TYPE.SEND_OTP_ERROR: {
      return {
        ...state,
        loading: false,
        sendOtp: {},
      };
    }

    //verify otp
    case TYPE.VERIFY_OTP_REQUEST: {
      return {
        ...state,
        loading: true,
        verifyOtp: {},
      };
    }
    case TYPE.VERIFY_OTP_SUCCESS: {
      return {
        ...state,
        loading: false,
        verifyOtp: action.payload,
      };
    }
    case TYPE.VERIFY_OTP_ERROR: {
      return {
        ...state,
        loading: false,
        verifyOtp: {},
      };
    }

    //signup
    case TYPE.USER_EMAIL: {
      return {
        ...state,
        email: action.payload,
      };
    }
    case TYPE.SIGNUP_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case TYPE.SIGNUP_ERROR: {
      return {
        ...state,
        loading: false,
      };
    }
    case TYPE.SIGNUP_SUCCESS: {
      return {
        ...state,
        loading: false,
        signupData: action.payload,
      };
    }
    case TYPE.SIGNUP_DATA_CLEAR: {
      return {
        ...state,
        loading: false,
        signupData: null,
      };
    }
    //login
    case TYPE.LOGIN_REQUEST: {
      return {
        ...state,
        loading: true,
        isLoggedIn: false,
      };
    }
    case TYPE.LOGIN_ERROR: {
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
      };
    }
    case TYPE.LOGIN_SUCCESS: {
      return {
        ...state,
        loading: false,
        isLoggedIn: true,
        access_token: action.payload.token,
        userData: action.payload,
      };
    }

    case TYPE.LOGIN_DATA_CLEAR: {
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
      };
    }

    //edit Profile
    //send otp
    case TYPE.EDIT_PROFILE_REQUEST: {
      return {
        ...state,
        loading: true,
        // userData: {},
      };
    }
    case TYPE.EDIT_PROFILE_SUCCESS: {
      return {
        ...state,
        loading: false,
        userData: action.payload,
      };
    }
    case TYPE.EDIT_PROFILE_ERROR: {
      return {
        ...state,
        loading: false,
      };
    }

    //logout
    case TYPE.LOGOUT_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case TYPE.LOGOUT_SUCCESS: {
      return {
        ...state,
        loading: false,
        userData: null,
        access_token: "",
        isLoggedIn: false,
      };
    }
    case TYPE.LOGOUT_ERROR: {
      return {
        ...state,
        loading: false,
      };
    }
    default:
      return state;
  }
};
