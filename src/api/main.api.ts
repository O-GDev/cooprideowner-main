import { AddVehiclePayloadType } from "../types/api/mainApi.type";
import apiClient, { mediaClient } from "./index";

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

    // console.log('vehicle earnings >+++ ', res.data)

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const makeWithdrawRequest = async (payload: any) => {
  try {
    return await apiClient.post("transactions/withdrawals/", payload);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addVehicle = async (payload: AddVehiclePayloadType) => {
  try {
    return await apiClient.post("ride_mgt/vehicles/", payload);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const uploadMedia = async (formData: any) => {
  try {
    return await mediaClient.post("", formData);
  } catch (error) {
    console.log(error);
    throw error
  }
};
