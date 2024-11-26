import { PiCoatHanger } from "react-icons/pi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Link } from "react-router-dom";

export default function faq() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth"})
    }
  return (
    <div className=" pb-[3%] px-[5%] flex items-center sm:items-start justify-between ">
      <section className=" w-[60%] sm:w-auto ">
        <div className=" flex flex-col gap-1 ">
          <div className=" text-[1.5rem] flex justify-start sm:justify-center ">
            <PiCoatHanger />
          </div>
          <p className="text-[0.8rem] sm:text-[0.9rem] lg:text-[1rem] ">Need help shopping and placings order?</p>
        </div>
      </section>
      <section>
        <div className=" flex flex-col gap-0 ">
          <Link to="/faqs" className=" hover:text-[blue] hover:border-[blue] font-medium text-[0.9rem] sm:text-[1rem] lg:text-[1.1rem] px-3 sm:px-5 lg:px-6 py-1 border-[1.5px] border-black rounded-[12px] ">
            FAQs
          </Link>
          <div onClick={scrollToTop} className="hover:text-[blue] hover:rotate-180 cursor-pointer text-[2rem] leading-none flex justify-center ">
          <MdOutlineKeyboardArrowDown />
          </div>
        </div>
      </section>
    </div>
  );
}
