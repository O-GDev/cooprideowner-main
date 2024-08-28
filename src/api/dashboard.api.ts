import apiClient from "./index";

export const getOwnerData = async () => {
  try {
    const res = await apiClient.get("user_mgt/dashboard/");
    return res.data;
  } catch (error) {
    throw error;
  }
};
