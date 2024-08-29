// ChatGPT inspired
import React, { createContext, useState, ReactNode, useContext } from "react";
import { cacheData, removeCachedData } from "../helpers/storage";
import { logoutApi } from "@/api/auth.api";

interface userType {
  address?: string;
  business_name: string;
  company_code?: string;
  country?: string;
  date_created?: string;
  date_updated?: string;
  gender: string;
  id?: string;
  is_verified: boolean;
  owner: number | null;
  phone_number: string;
  profile_pic_url?: string;
  rc_number?: string;
  state: string;
  user_details: {
    email: string;
    first_name: string;
    last_name: string;
  };
}

interface AuthContextType {
  user: userType;
  cacheUser?: (user: userType) => void;
  logout?: () => void;
}

const initialState: AuthContextType = {
  user: {
    id: "",
    user_details: {
      first_name: "",
      last_name: "",
      email: "",
    },
    state: "",
    phone_number: "",
    business_name: "",
    gender: "",
    is_verified: false,
    address: "",
    company_code: "",
    country: "",
    date_created: "",
    date_updated: "",
    owner: null,
    profile_pic_url: "",
    rc_number: "",
  },
  cacheUser: (user) => {},
  logout: () => {},
};

const AppStateContext = createContext<AuthContextType | undefined>(initialState);

export const AppStateProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<userType>(initialState.user);

  console.log(user)

  const cacheUser = (user: userType) => {
    cacheData("user", user);
    setUser(user);
  };

  const logout = async () => {
    await logoutApi()
    removeCachedData('user');
    removeCachedData('token');
    setUser(initialState.user);
  };

  return <AppStateContext.Provider value={{ user, cacheUser, logout }}>{children}</AppStateContext.Provider>;
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AppStateProvider");
  }
  return context;
};
