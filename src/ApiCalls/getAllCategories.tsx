import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSelector } from "react-redux";

interface AuthState {
  auth: {
    user: {
      token: string;
      _id: string
    } | null;
  };
}

export function useGetAllCategories() {
  const baseUrl = import.meta.env.VITE_BASEURL;
  const token = useSelector((state: AuthState) => state.auth.user?.token);

  const getAllCategories = () => {
    return axios.get(`${baseUrl}/api/categories`, 
      {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  };
  return useQuery({
    queryKey: ["allCategories"],
    queryFn: getAllCategories,
    // enabled: false, // to prevent it from  fetching the data or for it to run when maybe a function above returns a data eg, !!id
    staleTime: 60000,
    // retry: 4
    // refetchInterval: 2000
  });
}