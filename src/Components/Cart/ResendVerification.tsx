import { useState } from "react";
// import { CartBtn } from "../Button/CartBtn";
import { useNavigate } from "react-router-dom";
import Auth from "../auth/Auth";
import { useSelector } from "react-redux";
import { ThreeDots } from "react-loader-spinner";
import { handleResendVerification } from "../../ApiCalls/handleResendVerification";

export const ResendVerification = () => {
  const [showAuth, setShowAuth] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const authenticatedUser = useSelector((state: any) => state.auth.user);


  // submit verify
  const id = authenticatedUser?._id;
  

  const handleApiResendVerification = async () => {
    setLoading(true);

    await handleResendVerification({id, setLoading, setShowAuth, showAuth, navigate});
  };

  return (
    <div className="mt-[6rem] sm:mt-[7rem] lg:mt-[9rem] flex justify-center items-center">
      <div className=" mx-auto max-w-[471px] w-[95%] bg-White py-[15%] sm:py-[5%] px-[2%]">
        <header className="flex justify-end"></header>
        <div className="">
          <div className="flex flex-col gap-1 text-center">
            <h2 className=" text-[1.3rem] sm:text-[1.5rem] font-semibold ">
            Click to the button below to get a verification mail.
            </h2>
          </div>
          <section className="flex justify-center  items-center min-h-[10vh] sm:min-h-[20vh] ">
            {" "}
            {loading ? (
              <div className="  ">
                <ThreeDots
                  visible={true}
                  height="90"
                  width="90"
                  color="black"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </div>
            ) : (
              <div>
                <button
                  onClick={handleApiResendVerification}
                  className={` w-full border-Black block text-center text-white text-base border-[1px] font-semibold bg-Black py-2 px-5`}
                >
                  Send Verification Mail
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
      {showAuth ? (
        <div className="fixed z-[200] ">
          <Auth close={() => setShowAuth(!showAuth)} />
        </div>
      ) : null}
    </div>
  );
};
