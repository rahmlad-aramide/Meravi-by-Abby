import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useGetProductsByCategory(id: any, gender: any) {
  const baseUrl = import.meta.env.VITE_BASEURL;
  // const token = useSelector((state: AuthState) => state.auth.user?.token);
  const getProductsByCategory = () => {
    return axios.get(`${baseUrl}/api/products/available?categoryId=${id}&gender=${gender}`, 
  );
  };
  return useQuery({
    queryKey: ["productsByCategory", id, gender],
    queryFn: getProductsByCategory,
    staleTime: 60000,
  });
}
