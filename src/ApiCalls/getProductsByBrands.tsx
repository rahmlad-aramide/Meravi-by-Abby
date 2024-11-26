import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useGetProductsyBrands(id: any, gender: any) {
  const baseUrl = import.meta.env.VITE_BASEURL;
  
  const getProductsByBrands = () => {
    return axios.get(`${baseUrl}/api/products/available?brandId=${id}&gender=${gender}`, 
  );
  };
  return useQuery({
    queryKey: ["productsByBrands", id, gender],
    queryFn: getProductsByBrands,
    staleTime: 60000,
  });
}
