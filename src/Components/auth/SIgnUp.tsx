/* eslint-disable @typescript-eslint/no-explicit-any */
// import { GoogleButton } from "../Button/GoogleBtn";
import { FieldError, useForm } from "react-hook-form";
import { Oval } from "react-loader-spinner";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { handleSignUp } from "../../ApiCalls/handleSignUp";

interface Props {
  closeButton: () => void;
}

const bonus = [
  "Enjoy 10% off your first order",
  "Follow your online orders and access your purchase history",
  "Get Rewards on every order",
  "Create your personal Wish List",
];

export const SignUp = ({ closeButton }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
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
    firstName: {
      required: "First Name is required",
      minLength: {
        value: 3,
        message: "First Name must have at least 3 characters",
      },
    },
    lastName: {
      required: "Last Name is required",
      minLength: {
        value: 3,
        message: "Last Name must have at least 3 characters",
      },
    },
    phoneNumber: {
      required: "Phone Number is required",
      minLength: {
        value: 11,
        message: "Phone Number must have at least 11 characters",
      },
    },
    email: {
      required: "Email is required",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: "Invalid email address",
      },
    },
    password: {
      required: "Password is required",
      minLength: {
        value: 8,
        message: "Password must have at least 3 characters",
      },
    },
  };
  //   form validations ends

  //   form submit call
  const handleApiSubmit = async () => {
    const { firstName, lastName, email, phoneNumber, password } = getValues();
    const type = "CUSTOMER";

    const data = {
      email,
      password,
      phoneNumber,
      firstName,
      lastName,
      type,
    };
    console.log("Data being sent: ", data);
    setLoading(true);

   await handleSignUp({data, setLoading, closeButton, reset})

  };

  return (
    <section>
      <div className="border-b-[1px] border-b-[#2222224D] py-6">
        {bonus.map((text: string, index: number) => (
          <p
            key={index}
            className="flex items-center gap-2 text-sm mb-2 font-outfit"
          >
            <svg
              className="shrink-0"
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.6969 7.99967C14.6969 11.6816 11.7121 14.6663 8.03019 14.6663C4.34829 14.6663 1.36353 11.6816 1.36353 7.99967C1.36353 4.31778 4.34829 1.33301 8.03019 1.33301C11.7121 1.33301 14.6969 4.31778 14.6969 7.99967ZM13.3635 7.99967C13.3635 10.9452 10.9757 13.333 8.03019 13.333C5.08467 13.333 2.69686 10.9452 2.69686 7.99967C2.69686 5.05416 5.08467 2.66634 8.03019 2.66634C9.60231 2.66634 11.0155 3.34656 11.9917 4.42873L7.36353 9.05687L5.5016 7.19494C5.24125 6.93459 4.81914 6.93459 4.55879 7.19494C4.29844 7.45529 4.29844 7.8774 4.55879 8.13775L6.42072 9.99968C6.94142 10.5204 7.78564 10.5204 8.30633 9.99967L12.7645 5.54151C13.1472 6.27711 13.3635 7.11313 13.3635 7.99967Z"
                fill="#35383F"
              />
            </svg>
            <span>{text}</span>
          </p>
        ))}
      </div>
      <form action="" onSubmit={handleSubmit(handleApiSubmit, handleError)}>
        <div className="mt-4">
          <label
            className="text-sm font-medium text-[#344054]"
            htmlFor="firstName"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            {...register("firstName", registerOptions.firstName)}
            className="block border-[1px] border-[#D0D5DD] focus:outline-[#e4e6ea] shadow-shawdowCart text-[#344054] font-sm text-[.95rem] font-medium mt-1 px-2 py-2 w-full"
          />
        </div>
        <small className=" text-[red] ">
          {errors?.firstName &&
            renderErrorMessage(errors.firstName as FieldError)}
        </small>

        <div className="mt-4">
          <label
            className="text-sm font-medium text-[#344054]"
            htmlFor="lastName"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            {...register("lastName", registerOptions.lastName)}
            className="block border-[1px] border-[#D0D5DD] focus:outline-[#e4e6ea] shadow-shawdowCart text-[#344054] font-sm text-[.95rem] font-medium mt-1 px-2 py-2 w-full"
          />
        </div>
        <small className=" text-[red] ">
          {errors?.lastName &&
            renderErrorMessage(errors.lastName as FieldError)}
        </small>

        <div className="mt-4">
          <label className="text-sm font-medium text-[#344054]" htmlFor="email">
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

        <div className="mt-4">
          <label
            className="text-sm font-medium text-[#344054]"
            htmlFor="phoneNumber"
          >
            Phone Number
          </label>
          <input
            type="number"
            id="phoneNumber"
            {...register("phoneNumber", registerOptions.phoneNumber)}
            className="block border-[1px] border-[#D0D5DD] focus:outline-[#e4e6ea] shadow-shawdowCart text-[#344054] font-sm text-[.95rem] font-medium mt-1 px-2 py-2 w-full"
          />
        </div>
        <small className=" text-[red] ">
          {errors?.phoneNumber &&
            renderErrorMessage(errors.phoneNumber as FieldError)}
        </small>

        <div className="mt-4">
          <label className="text-sm font-medium text-[#344054]" htmlFor="email">
            Password
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
          <small className=" text-[red] ">
            {errors?.password &&
              renderErrorMessage(errors.password as FieldError)}
          </small>
        </div>

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
          ): (
            <p>Sign Up</p>
          )}
        </button>

        {/* <p className="text-center font-outfit text-Black my-4">OR</p> */}
        {/* <div className="mb-6">
          <GoogleButton />
        </div> */}
      </form>
    </section>
  );
};
