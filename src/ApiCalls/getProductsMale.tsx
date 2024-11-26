import { useQuery } from "@tanstack/react-query";
import axios from "axios";
// import { useSelector } from "react-redux";

// interface AuthState {
//   auth: {
//     user: {
//       token: string;
//     } | null;
//   };
// }

export function useGetProductsMale() {
  const baseUrl = import.meta.env.VITE_BASEURL;
  // const token = useSelector((state: AuthState) => state.auth.user?.token);
  const getProductsMale = () => {
    return axios.get(`${baseUrl}/api/products/available?gender=male`, 
    //   {
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${token}`,
    //   },
    // }
  );
  };
  return useQuery({
    queryKey: ["productsMale"],
    queryFn: getProductsMale,
    // enabled: false, // to prevent it from  fetching the data or for it to run when maybe a function above returns a data eg, !!id
    staleTime: 60000,
    // retry: 4
    // refetchInterval: 2000
  });
}
