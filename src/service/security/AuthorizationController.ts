import request from "@/utils/request";

// 获取授权码
export const getAuthCode = async (params: any) => {
  return request.get("/security/oauth/authorize", {
    params: params,
  });
}

// 获取token
export const token = async (params: any) => {
  return request.post("/security/oauth/token", params);
}
