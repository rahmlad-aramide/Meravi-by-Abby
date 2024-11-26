import { useRef, useState } from "react";
import { CartBtn } from "../Button/CartBtn";
import { IoClose } from "react-icons/io5";

interface Props {
  close: () => void;
}

export const EmailVerification = ({ close }: Props) => {
  const [verificationData, setVerificationData] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const handleInput = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newData = [...verificationData];
    newData[index] = e.target.value;
    setVerificationData(newData);

    if (
      e.target.value.length === 1 &&
      index < inputRefs.length - 1 &&
      inputRefs[index + 1]?.current !== null
    ) {
      inputRefs[index + 1].current!.focus(); // Use non-null assertion operator (!) here
    }
  };


  const handlePaste = (
    index: number,
    e: React.ClipboardEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").split("");
    const newData = [...verificationData];
    pastedData.forEach((char, i) => {
      if (index + i < inputRefs.length) {
        newData[index + i] = char;
      }
    });
    setVerificationData(newData);
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (
      e.key === "Backspace" &&
      index > 0 &&
      verificationData[index].length === 0
    ) {
      const newData = [...verificationData];
      newData[index - 1] = "";
      setVerificationData(newData);
      inputRefs[index - 1].current!.focus();
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
          <div className="flex flex-col gap-2 text-center">
            <h2 className=" text-[1.3rem] font-semibold ">Email Verification</h2>
            <p className=" text-base font-medium">
            We have sent a verification code to your email  Ezekiel@gmail.com 
            </p>
          </div>
          <div className=" py-[5%] ">
          <section className=" flex justify-center gap-3">
              {inputRefs.map((ref, index) => (
                <input
                  key={index}
                  type="text"
                  className="w-12 py-2 px-1 text-[1.3rem] font-semibold border-black  border-[1px] outline-[2px] text-GrayText text-center "
                  maxLength={1}
                  ref={ref}
                  value={verificationData[index]}
                  onChange={(e) => handleInput(index, e)}
                  onPaste={(e) => handlePaste(index, e)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                />
              ))}
            </section>
          </div>
          <CartBtn
            text="Verify"
            width="w-full"
            link="/checkout"
            onClick={close}
          />
        </div>
        <p
          onClick={close}
          className=" block mx-auto font-medium text-center text-sm  mt-4"
        >
          Resend code in <span className=" text-red-500 ">1:25</span>
        </p>
      </div>
    </div>
  );
};
