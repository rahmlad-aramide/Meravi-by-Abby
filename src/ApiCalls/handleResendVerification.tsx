/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { toast } from "react-toastify";


export const handleResendVerification = async ({id, setLoading, setShowAuth, showAuth, navigate}: any) => {
    const baseUrl = import.meta.env.VITE_BASEURL;
  const url = `${baseUrl}/api/users/${id}/resend-otp`;

    setLoading(true);
    try {
      const response = await axios.put(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      setShowAuth(!showAuth);
      setLoading(false);
      navigate("/")
      toast.success("A email verification link has been re-sent to your email.");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
    //   console.log(error);
      setLoading(false);
      toast.error(error?.response?.data?.message || "Network error. Try again.");
    }
  };