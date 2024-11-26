import { useState } from "react";
import { FieldError, useForm } from "react-hook-form";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import { toast } from "react-toastify";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import Auth from "../auth/Auth";

export const ChangePassword = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [passwordCodeVisible, setPasswordCodeVisible] = useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [showAuth, setShowAuth] = useState<boolean>(false);

  // useEffect(() => {
  //     if (showEmailVerification === true) {
  //       document.body.style.overflow = "hidden";
  //     }
  //     return (): void => {
  //       document.body.style.overflow = "unset";
  //     };
  //   }, [showEmailVerification]);

  //   form validations starts
  const renderErrorMessage = (error: FieldError) => {
    // You can customize the rendering here based on your requirements
    return <span>{error.message}</span>;
  };

  const {
    register,
    handleSubmit,
    // reset,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });
  const handleError = () => {};

  const registerOptions = {
    code: {
      required: "One-time code is required",
      minLength: {
        value: 6,
        message: "One-time code must have at least 6 characters",
      },
    },
    password: {
      required: "Password is required",
      minLength: {
        value: 8,
        message: "Password must have at least 8 characters",
      },
    },
  };
  //   form validations ends

  //   form submit call
  const baseUrl = import.meta.env.VITE_BASEURL;
  const url = `${baseUrl}/api/users/change-password`;

  const handleApiSubmit = async () => {
    const { code, password } = getValues();

    const data = {
      code,
      password
    };
    console.log("Data being sent: ", data);
    setLoading(true);
    try {
      const response = await axios.put(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response?.data) {
        toast.success("Account Password Changed Successfully! Log in now");
        setShowAuth(!showAuth);
      }
      //  reset;
      setLoading(false);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error?.response?.status === 404) {
        toast.error("Invalid one-time code");
      } else {
        toast.error("Network error");
      }
      // console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className=" mt-[6rem] sm:mt-[7rem] lg:mt-[9rem] mb-[15%] sm:mb-[5%]  flex justify-center items-center">
      <div className=" mx-auto max-w-[471px] w-[95%] bg-White py-[1.5%] px-[2%]  max-h-[100vh] overflow-y-auto ">
        <div className="">
          <div className="flex flex-col gap-2">
            <h2 className=" text-[1.5rem] font-semibold ">Change Password</h2>
            <p className=" text-base text-justify font-medium">
              Enter your one-time code and new password.{" "}
            </p>
          </div>
          <form action="" onSubmit={handleSubmit(handleApiSubmit, handleError)}>
          <div className="mt-4">
          <label
            className="text-sm font-medium text-[#344054]"
            htmlFor="code"
          >
            One-time Code
          </label>
          <div className=" relative">
            <input
              type={passwordCodeVisible ? "text" : "password"}
              id="code"
              {...register("code", registerOptions.code)}
              className="block border-[1px] border-[#D0D5DD] focus:outline-[#e4e6ea] shadow-shawdowCart text-[#344054] font-sm text-[.95rem] font-medium mt-1 px-2 py-2 w-full"
            />
            <span
              className=" absolute right-[2%] top-[50%] translate-y-[-50%] cursor-pointer"
              onClick={() => setPasswordCodeVisible(!passwordCodeVisible)}
            >
              {passwordCodeVisible ? (
                <div>
                  <FaRegEyeSlash />
                </div>
              ) : (
                <div>
                  <FaRegEye />
                </div>
              )}
            </span>
          </div>
        </div>
        <small className=" text-[red] ">
          {errors?.code &&
            renderErrorMessage(errors.code as FieldError)}
        </small>

        <div className="mt-4">
          <label
            className="text-sm font-medium text-[#344054]"
            htmlFor="password"
          >
            New Password
          </label>
          <div className=" relative">
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              {...register("password", registerOptions.password)}
              className="block border-[1px] border-[#D0D5DD] focus:outline-[#e4e6ea] shadow-shawdowCart text-[#344054] font-sm text-[.95rem] font-medium mt-1 px-2 py-2 w-full"
            />
            <span
              className=" absolute right-[2%] top-[50%] translate-y-[-50%] cursor-pointer"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? (
                <div>
                  <FaRegEyeSlash />
                </div>
              ) : (
                <div>
                  <FaRegEye />
                </div>
              )}
            </span>
          </div>
        </div>
        <small className=" text-[red] ">
          {errors?.password &&
            renderErrorMessage(errors.password as FieldError)}
        </small>

            <button className="mt-7 w-full flex justify-center border-Black  text-center text-white text-base border-[1px] font-semibold bg-Black py-3 px-5">
              {loading ? (
                <Oval
                  visible={true}
                  height="25"
                  width="25"
                  color="white"
                  ariaLabel="oval-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              ) : (
                <p>Change Password</p>
              )}
            </button>
          </form>
        </div>
        <button
          onClick={close}
          className=" block mx-auto font-outfit text-base font-semibold mt-4"
        >
          Go back to sign in
        </button>
      </div>
      {showAuth ? (
        <div className="fixed z-[200] ">
          <Auth close={() => setShowAuth(!showAuth)} /> 
        </div>
      )
      : null}
    </div>
  );
};
