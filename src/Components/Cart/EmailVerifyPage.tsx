import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import Auth from "../auth/Auth";
import { useSelector } from "react-redux";
import { ThreeDots } from "react-loader-spinner";
import { handleEmailVerification } from "../../ApiCalls/handleEmailVerification";

export const EmailVerifyPage = () => {
  // const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const otp = queryParams.get("otp");
  const [showAuth, setShowAuth] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const authenticatedUser = useSelector((state: any) => state.auth.user);
  const hasMounted = useRef(false);

  // console.log({
  //   "id: ": id,
  //   "otp: ": otp,
  // });

  useEffect(() => {
    if (authenticatedUser) {
      toast.info("You are already logged in.");
      navigate("/");
    }
  }, [authenticatedUser, navigate]);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      handleVerificationSubmit();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // submit verify
 

  const handleVerificationSubmit = async () => {

    await handleEmailVerification({id, otp, navigate, setLoading, setShowAuth, showAuth});

  };

  return (
    <div className="mt-[6rem] sm:mt-[7rem] lg:mt-[9rem] flex justify-center items-center">
      <div className=" mx-auto max-w-[471px] w-[95%] bg-White py-[15%] sm:py-[5%] px-[2%]">
        <header className="flex justify-end"></header>
        <div className="">
          <div className="flex flex-col gap-1 text-center">
            <h2 className=" text-[1.3rem] sm:text-[1.5rem] font-semibold ">
              {loading ? (
                <span>Please wait while we verify your email.</span>
              ) : (
                <span>Click to the button below verify your email.</span>
              )}
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
                  onClick={handleVerificationSubmit}
                  className={` w-full border-Black block text-center text-white text-base border-[1px] font-semibold bg-Black py-2 px-5`}
                >
                  Verify Mail
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
