/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { toast } from "react-toastify";


export const handleEmailVerification = async ({id, otp, navigate, setLoading, setShowAuth, showAuth}: any) => {
  const baseUrl = import.meta.env.VITE_BASEURL;
  const url = `${baseUrl}/api/users/email/verify/${id}/${otp}`;

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
      toast.success("Email has been verified! If not logged in, please proceed to login");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      toast.error(error?.response?.data?.message || "Verification failed. Try again.");
    }
  };