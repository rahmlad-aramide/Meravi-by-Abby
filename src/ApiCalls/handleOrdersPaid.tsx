/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { toast } from "react-toastify";

export const handleOrdersPaid = async ({ token, orderId }: any) => {
  const baseUrl = import.meta.env.VITE_BASEURL;
  const url = `${baseUrl}/api/orders/${orderId}/pay`;

  try {
    const response = await axios.put(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response);
    if (response?.data) {
      toast.success("Payment successfully!");
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (!orderId) {
      toast.error("Error in sending order details");
    } else if (error?.response?.status === 400) {
      toast.error("Error in sending order details");
    } {
      toast.error(error?.response?.data?.message);
    }
    // console.log(error);
  }
};
