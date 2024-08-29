import { showToast } from "@/utils/toast";
import apiClient from ".";
import { getErrorMessage } from "@/utils/errorHandler";

export const signUp = async (payload: {}) => {
  console.log("signing up", payload);
  try {
    const res = await apiClient.post("user_mgt/signup/", payload);
    console.log(res);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (payload: { email: string; password: string }) => {
  try {
    const res = await apiClient.post("user_mgt/login/", payload);
    return res;
  } catch (error: any) {
    showToast(getErrorMessage(error));
    throw error;
  }
};

export const logoutApi = async () => {
  try {
    await apiClient.post("user_mgt/logout/");
    showToast("Logged out successfully", "success");
  } catch (error: any) {
    throw error;
  }
};

export const verifyEmail = async (payload: { email: string; otp: string }) => {
  try {
    const res = await apiClient.post("user_mgt/verify_account/", payload);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateProfile = async (userId: string, payload: {}) => {
  console.log("updating profile", payload);
  try {
    const res = await apiClient.patch(`user_mgt/merchants/${userId}`, payload);
    console.log(res);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const requestPasswordReset = async (email: string) => {
  try {
    const res = await apiClient.post("user_mgt/forget_password_link/", { email });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (payload: { password: string; email: string; confirm_password: string }) => {
  try {
    const res = await apiClient.post("user_mgt/forget_password/", payload);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const verifyOtp = async (payload: { email: string; otp: string }) => {
  try {
    const res = await apiClient.post("user_mgt/verify_otp/", payload);
    console.log(res.data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const verifyPassword = async (payload: { password: string }) => {
  try {
    const res = await apiClient.post("user_mgt/verify_password/", payload);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const changePassword = async (payload: {
  new_password: string;
  current_password: string;
  confirm_password: string;
}) => {
  try {
    const res = await apiClient.post("user_mgt/reset_password/", payload);
    showToast("Password updated sucessfully", "success");
  } catch (error: any) {
    showToast(getErrorMessage(error), "error");
    throw error;
  }
};
