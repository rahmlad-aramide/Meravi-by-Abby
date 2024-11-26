import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { FieldError, useForm } from "react-hook-form";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface Props {
  close: () => void;
}

export const ForgetPasswordModal = ({ close }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  //   form validations starts
  const renderErrorMessage = (error: FieldError) => {
    // You can customize the rendering here based on your requirements
    return <span>{error.message}</span>;
  };

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });
  const handleError = () => {};

  const registerOptions = {
    email: {
      required: "Email is required",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: "Invalid email address",
      },
    },
  };
  //   form validations ends

  //   form submit call
  const baseUrl = import.meta.env.VITE_BASEURL;
  const url = `${baseUrl}/api/users/forgot-password`;

  const handleApiSubmit = async () => {
    const { email } = getValues();

    const data = {
      email
    };
    // console.log("Data being sent: ", data);
    setLoading(true);
    try {
      const response = await axios.put(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response?.data) {
        // toast.success("A reset password code has been sent to your email.");
        navigate("/change-password");
      }
      navigate("/change-password");
       reset;
      setLoading(false);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error?.response?.status === 400) {
        toast.error("Email address not found");
      } else {
        toast.error("Network Error!");
      }
      // console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center z-100 bg-transparentDark">
      <div className=" mx-auto max-w-[471px] w-[95%] bg-White py-[1.5%] px-[2%]  max-h-[100vh] overflow-y-auto ">
        <header className="flex justify-end">
          <button onClick={close} className="text-[1.5rem] ">
            <IoClose />
          </button>
        </header>
        <div className="">
          <div className="flex flex-col gap-2">
            <h2 className=" text-[1.3rem] font-semibold ">Forgot password?</h2>
            <p className=" text-base text-justify font-medium">
              Enter your DI LUSSO email address to receive a password rest link.{" "}
            </p>
          </div>
          <form action="" onSubmit={handleSubmit(handleApiSubmit, handleError)}>
            <div className="mt-4">
              <label
                className="text-sm font-medium text-[#344054]"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email", registerOptions.email)}
                className="block border-[1px] border-[#D0D5DD] focus:outline-[#e4e6ea] shadow-shawdowCart text-[#344054] font-sm text-[.95rem] font-medium mt-1 px-2 py-2 w-full"
              />
            </div>
            <small className=" text-[red] ">
              {errors?.email && renderErrorMessage(errors.email as FieldError)}
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
                <p>Reset Password</p>
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
    </div>
  );
};
