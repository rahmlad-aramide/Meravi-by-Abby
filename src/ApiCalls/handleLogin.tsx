/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { toast } from "react-toastify";
import { setUser } from "../redux/slice/authSlice";


export const handleLogin = async ({ data, navigate, dispatch, setLoading, closeButton, reset}: any) => {
  const baseUrl = import.meta.env.VITE_BASEURL;
  const url = `${baseUrl}/api/users/login`;

    // console.log("Data being sent: ", data);
    setLoading(true);
    try {
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // console.log(response);
      navigate("/");
      dispatch(setUser(response?.data?.data));
      toast.success("Log in succesfully!");
      closeButton();
       reset;
      setLoading(false);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Error in logging in!" )
      // console.log(error);
      setLoading(false);
    }
  };
