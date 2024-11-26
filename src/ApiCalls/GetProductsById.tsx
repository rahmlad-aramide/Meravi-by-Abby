import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSelector } from "react-redux";

interface AuthState {
  auth: {
    user: {
      token: string;
    } | null;
  };
}

export function useGetProductsById(id: string) {
  const baseUrl = import.meta.env.VITE_BASEURL;
  const token = useSelector((state: AuthState) => state.auth.user?.token);
  const getProductsById = () => {
    return axios.get(`${baseUrl}/api/products/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  };
  return useQuery({
    queryKey: ["productsId", id],
    queryFn: getProductsById,
    enabled: !!id, 
    staleTime: 60000,
    // retry: 4
    // refetchInterval: 2000
  });
}
