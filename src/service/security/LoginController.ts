import request from "@/utils/request";

/**
 * 获取验证码
 */
export const getCaptchaInfo = async () => {
  return request.get("/security/auth/captcha/getCaptcha");
}


/**
 * 登录
 */
export const loginAuth = async (params: any) => {
  return request.post("/security/auth/user/login", params);
}

/**
 * 获取用户信息
 */
export const getUserInfo = async () => {
  return request.get("/security/auth/user/getUserInfo");
}