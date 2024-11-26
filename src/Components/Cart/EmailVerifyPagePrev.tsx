import { useEffect, useRef, useState } from "react";
// import { CartBtn } from "../Button/CartBtn";
import axios from "axios";
import { toast } from "react-toastify";
import {  useNavigate, useParams } from "react-router-dom";
import Auth from "../auth/Auth";
import { useSelector } from "react-redux";

export const EmailVerifyPagePrev = () => {
  const { id } = useParams<{ id: string }>();
  const [showAuth, setShowAuth] = useState<boolean>(false);
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const authenticatedUser = useSelector((state: any) => state.auth.user);
  // const navigate = useNavigate();
  const [verificationData, setVerificationData] = useState<string>(
    "".padEnd(6, "")
  );

  useEffect(() => {
    if (authenticatedUser) {
      toast.info("You are already logged in.");
      navigate("/");
    }
  }, [authenticatedUser, navigate]);

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const handleInput = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = e.target.value;
    if (newValue.length > 1) return;

    const newData = verificationData.split("");
    newData[index] = newValue;
    setVerificationData(newData.join(""));

    if (
      newValue.length === 1 &&
      index < inputRefs.length - 1 &&
      inputRefs[index + 1]?.current !== null
    ) {
      inputRefs[index + 1].current!.focus();
    }
  };

  const handlePaste = (
    index: number,
    e: React.ClipboardEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").split("");
    const newData = verificationData.split("");
    pastedData.forEach((char, i) => {
      if (index + i < inputRefs.length) {
        newData[index + i] = char;
      }
    });
    setVerificationData(newData.join(""));
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace") {
      if (index > 0 && verificationData[index] === "") {
        inputRefs[index - 1].current!.focus();
        const newData = verificationData.split("");
        newData[index - 1] = "";
        setVerificationData(newData.join(""));
      } else {
        const newData = verificationData.split("");
        newData[index] = "";
        setVerificationData(newData.join(""));
      }
    }
  };

  // console.log("verify code", verificationData);

  // submit verify
  const baseUrl = import.meta.env.VITE_BASEURL
  const url = `${baseUrl}/api/users/email/verify/${id}/${verificationData}`;

  const handleVerificationSubmit = async () => {
    console.log("Submitting verification data:", verificationData);
    try {
      const response = await axios.put(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      setShowAuth(!showAuth);
      // navigate("/")
      toast.success("Email has been verified! Please proceed to login");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Verification failed.");
    }
  };

  return (
    <div className="mt-[5rem] sm:mt-[7rem] lg:mt-[9rem] flex justify-center items-center">
      <div className=" mx-auto max-w-[471px] w-[95%] bg-White py-[15%] sm:py-[5%] px-[2%]">
        <header className="flex justify-end"></header>
        <div className="">
          <div className="flex flex-col gap-1 text-center">
            <h2 className=" text-[1.9rem] font-semibold ">
              Email Verification
            </h2>
            <p className=" text-base font-medium">
              Please input your verification code
            </p>
          </div>
          <div className=" py-[8%] ">
            <section className=" flex justify-center gap-3">
              {inputRefs.map((ref, index) => (
                <input
                  key={index}
                  type="text"
                  className="w-10 sm:w-12 py-2 px-1 text-[1.1rem] sm:text-[1.3rem] font-semibold border-black  border-[1px] outline-[2px] text-GrayText text-center"
                  maxLength={1}
                  ref={ref}
                  value={verificationData[index] || ""}
                  onChange={(e) => handleInput(index, e)}
                  onPaste={(e) => handlePaste(index, e)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                />
              ))}
            </section>
          </div>
          <div >
            <button
            onClick={handleVerificationSubmit}
              className={` w-full border-Black block text-center text-white text-base border-[1px] font-semibold bg-Black py-3 px-5`}
            >
              Verify
            </button>
          </div>
        </div>
        <p className=" block mx-auto font-medium text-center text-sm  mt-4">
          Resend code in <span className=" text-red-500 ">1:25</span>
        </p>
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
