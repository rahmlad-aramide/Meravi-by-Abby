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

export function useGetAllBrands(gender: string) {
  const baseUrl = import.meta.env.VITE_BASEURL;
  const token = useSelector((state: AuthState) => state.auth.user?.token);

  const getAllBrands = () => {
    return axios.get(`${baseUrl}/api/brands?gender=${gender}`, 
      {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  };
  return useQuery({
    queryKey: ["allBrands", gender],
    queryFn: getAllBrands,
    // enabled: false, // to prevent it from  fetching the data or for it to run when maybe a function above returns a data eg, !!id
    staleTime: 60000,
    // retry: 4
    // refetchInterval: 2000
  });
}
