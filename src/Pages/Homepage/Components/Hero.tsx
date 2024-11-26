import { useState } from "react";
import Button2 from "../../../Components/Button/Button2";

export default function Hero() {
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  
  const backgroundImage = ["bg-hero-1", "bg-hero-1"];
  return (
    <>
      <section
        className={`${backgroundImage[backgroundIndex]} bg-center sm:bg-cover bg-dark/50 transition duration-200 h-full min-h-[620px] w-full grid grid-rows-3 mt-[130px] ssm:mt-[130px] sm:mt-[130px] lg:mt-[130px] px-[5%] pb-10`}
      >
        <div className="flex flex-col justify-center items-end row-start-2">
          <button onClick={()=>setBackgroundIndex(0)} className={`${backgroundIndex === 0 ? "bg-white": 'bg-[#CCC]'} transition duration-200 w-[11px] h-[11px] aspect-square rounded-full mb-2`}></button>
          <button onClick={()=>setBackgroundIndex(1)} className={`${backgroundIndex === 1 ? "bg-white": 'bg-[#CCC]'} transition duration-200 w-[11px] h-[11px] aspect-square rounded-full mb-2`}></button>
        </div>
        <div className="flex flex-col justify-center sm:justify-end items-center sm:items-end row-start-3 gap-10">
          <h1 className="text-[#FFFFFF] font-medium text-[40px] max-w-[11ch] text-center sm:text-right">Best Handmade Italian Shoes</h1>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button2 text="Shop Men" link="/category" />
            <Button2 text="Shop Women" link="/category" />
          </div>
        </div>
      </section>
    </>
  );
}
