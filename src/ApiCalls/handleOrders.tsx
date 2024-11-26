/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
// import { toast } from "react-toastify";



export const handleOrders = async ({ data, token }: any) => {
  const baseUrl = import.meta.env.VITE_BASEURL;
  const url = `${baseUrl}/api/orders`;

  try {
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response);
    // if (response?.data) {
    //   toast.success("Payment successfully!");
    // }
    return response?.data?.data; 

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // if (error?.response?.status === 400) {
    //   toast.error("Error in send order details");
    // } else {
    //   toast.error("Network error!");
    // }
    // console.log(error);
  }
};
