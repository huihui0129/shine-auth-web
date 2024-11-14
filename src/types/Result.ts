// 通用响应
export type Result<T> = {
  code: string;
  data: T;
  message: string;
};