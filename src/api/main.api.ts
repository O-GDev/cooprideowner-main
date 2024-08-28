import apiClient from "./index";

export const getTransactionHistory = async (userId: string) => {
  try {
    const res = await apiClient.get(`transactions/withdrawals/${userId}`);
    console.log("wwwwe...", res);
    return res;
  } catch (error) {
    throw error;
  }
};

export const getVehicles = async () => {
  try {
    return await apiClient.get(`ride_mgt/vehicles/`);
  } catch (error) {
    throw error;
  }
};

export const getVehicleEarningsByDate = async (payload: { vehicle_code: string; date: string }) => {
  try {
    const res = await apiClient.get(`transactions/vehicle_earnings/`, { data: payload });
    
    
    console.log('vehicle earnings >+++ ', res.data)
    
    return res.data


  } catch (error) {
    throw error;
  }
};

export const makeWithdrawRequest = async (payload: any) => {
    console.log(payload)
  try {
    return await apiClient.post("transactions/withdrawals/", payload);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
