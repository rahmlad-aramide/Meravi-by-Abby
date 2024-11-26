import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useGetProductsySubCategory(id: any, gender: any) {
  const baseUrl = import.meta.env.VITE_BASEURL;
  // const token = useSelector((state: AuthState) => state.auth.user?.token);
  const getProductsBySubCategory = () => {
    return axios.get(`${baseUrl}/api/products/available?subCategoryId=${id}&gender=${gender}`, 
  );
  };
  return useQuery({
    queryKey: ["productsBySubCategory", id, gender],
    queryFn: getProductsBySubCategory,
    staleTime: 60000,
  });
}
