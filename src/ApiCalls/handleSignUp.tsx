/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { toast } from "react-toastify";


export const handleSignUp = async ({data, setLoading, closeButton, reset}: any) => {
  const baseUrl = import.meta.env.VITE_BASEURL;
  const url = `${baseUrl}/api/users/`;

    // console.log("Data being sent: ", data);
    setLoading(true);
    try {
       await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    //   console.log(response);
      toast.success("Account created! Check email for verification code");
      closeButton();
      reset;
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
    //   console.log(error?.response?.data?.message);
    toast.error(error?.response?.data?.message || "Error in signing up!" )
    }
  };