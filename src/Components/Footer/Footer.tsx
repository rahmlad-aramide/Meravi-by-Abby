import { Link } from "react-router-dom";
import { FaWhatsapp, FaTiktok } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { RiTwitterXFill } from "react-icons/ri";
import { FaCcMastercard, FaCcVisa, FaCcPaypal } from "react-icons/fa6";
// import { AiOutlineYoutube } from "react-icons/ai";
import { useEffect } from "react";

export default function Footer() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  return (
    <div className=" bg-FooterGray px-[5%] py-[5%] sm:py-[2.5%] ">
      <section className=" flex justify-between">
        <div className=" flex-initial sm:flex-1 justify-self-start sm:justify-self-end">
          <h3 className=" text-[0.8rem] ssm:text-[0.9rem] md:text-[1rem] lg:text-[1.05rem] xxl:text-[1.1rem] font-semibold ">
            ABOUT US
          </h3>
          <section className=" mt-2  text-[0.8rem] ssm:text-[0.9rem] flex flex-col font-medium gap-y-2 sm:gap-y-4 ">
            <Link className=" hover:text-[blue] " to="/about">
              About Us
            </Link>
            <Link className=" hover:text-[blue] " to="/faqs">
              FAQS
            </Link>
          </section>
        </div>
        <div className=" flex-0 sm:flex-1 ">
          <section>
            <h3 className=" text-[0.8rem] ssm:text-[0.9rem] md:text-[1rem] lg:text-[1.05rem] xxl:text-[1.1rem] font-semibold ">
              CUSTOMER CARE
            </h3>
            <section className=" mt-2  text-[0.8rem] ssm:text-[0.9rem] flex flex-col font-medium gap-y-2 sm:gap-y-4 ">
              <Link className=" hover:text-[blue] " to="/contact">
                Contact Us
              </Link>
              <Link className=" hover:text-[blue] " to="/terms">
                Terms & Conditions
              </Link>
              <Link className=" hover:text-[blue] " to="/privacy-policy">
                Privacy Policy
              </Link>
            </section>
          </section>
        </div>

        {/* desktop */}
        <div className="hidden sm:block flex-1">
          <section className=" text-right ">
            <h4 className=" font-medium text-[0.95rem] lg:text-[1rem] ">
              Enjoy 10% off your first order
            </h4>
            <div className=" text-[0.8rem] mt-2 flex flex-col gap-1 ">
              <p>
                Claim your exclusive discount code when you subscribe to our
                emails.
              </p>
              <p>Terms and conditions apply</p>
            </div>
          </section>
          <form action="" className="flex gap-2 mt-4 ">
            <input
              type="email"
              className=" py-2 px-2 text-[0.8rem] w-full rounded-[4px] placeholder:text-Black "
              name=""
              id=""
              placeholder="your@address.com"
            />
            <button className="rounded-[4px]  bg-Black text-White text-[0.9rem] py-2 px-4 font-medium ">
              Submit
            </button>
          </form>
        </div>
      </section>
      {/* mobile */}
      <div className="block sm:hidden mt-[7%] flex-1">
        <section className=" text-center ">
          <h4 className=" font-medium text-[0.9rem] sm:text-[1rem] ">
            Enjoy 10% off your first order
          </h4>
          <div className=" text-[0.8rem] sm:text-[0.9rem] mt-2 flex flex-col gap-1 ">
            <p>
              Claim your exclusive discount code when you subscribe to our
              emails.
            </p>
            <p>Terms and conditions apply</p>
          </div>
        </section>
        <form action="" className="flex gap-2 mt-4 ">
          <input
            type="email"
            className=" py-2 px-2 text-[0.9rem] w-full rounded-[4px] placeholder:text-Black "
            name=""
            id=""
            placeholder="your@address.com"
          />
          <button className="rounded-[4px]  bg-Black text-White text-[0.9rem] py-2 px-4 font-medium ">
            Submit
          </button>
        </form>
      </div>
      <hr className=" my-6 border-opacity-20 border-Black border-[1px] " />
      <section className=" flex flex-col sm:flex-row gap-y-5 sm:gap-y-0 items-center justify-between">
        <div className="text-[1.5rem]  sm:text-[1.7rem] flex gap-4 ">
          <div>
            <FaCcMastercard />
          </div>
          <div>
            <FaCcVisa />
          </div>
          <div>
            <FaCcPaypal />
          </div>
        </div>
        <div className="text-[1.5rem] sm:text-[1.3rem] flex gap-4 ">
          <Link
            target="_blank"
            to="http://wa.me/2349043111111"
            className=" hover:text-blue-500 "
          >
            <FaWhatsapp />
          </Link>
          <Link
            target="_blank"
            to="https://www.instagram.com/dilussostore.shop?igsh=MTJ1bzdsejAxczduaw=="
            className=" hover:text-blue-500 "
          >
            <FaInstagram />
          </Link>
          {/* <Link to="" className="  hover:text-blue-500 " ><AiOutlineYoutube /></Link> */}
          <Link
            target="_blank"
            to="https://x.com/theluxurysale?s=11&t=NQgbxaJIExFGo54pHhkCeQ"
            className=" hover:text-blue-500 "
          >
            <RiTwitterXFill />
          </Link>
          <Link
            target="_blank"
            to="https://www.tiktok.com/@theluxurysale?_t=8p2bfUvHFa9&_r=1"
            className="  hover:text-blue-500 "
          >
            <FaTiktok />
          </Link>
        </div>
      </section>
    </div>
  );
}
