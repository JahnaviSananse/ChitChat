import request from "./request";

//Login
export async function login(req) {
  return request.authCall({
    url: "user/login",
    method: "post",
    data: req,
  });
}

//Logout
export async function logout(token) {
  return request.authCall(
    {
      url: "user/logout",
      method: "post",
      data: {},
    },
    token
  );
}

//send OTP
export async function sendOTP(req) {
  return request.authCall({
    url: "user/send_otp",
    method: "post",
    data: req,
  });
}

//verify OTP
export async function verifyOTP(req) {
  return request.authCall({
    url: "user/verify_otp",
    method: "post",
    data: req,
  });
}

//signup
export async function signup(req) {
  return request.authCall({
    url: "auth/signup",
    method: "post",
    data: req,
  });
}

//edit Profile
export async function editProfile(req, token) {
  return request.authCall(
    {
      url: "user/edit_profile",
      method: "post",
      data: req,
    },
    token
  );
}
