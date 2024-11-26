import { useState } from "react";
import Button2 from "../../../Components/Button/Button2";
import stonePurse from "../assets/stonePurse.png";
import qualityAbayas from "../assets/qualityAbayas.png";
import classyHeels from "../assets/classyHeels.png";

export default function Categories() {
  const [hoveredItem, setHoveredItem] = useState<number|null>(null);

  const handleMouseEnter = (index: number) => {
    setHoveredItem(index);
  };
  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const collectionData = [
    {
      image: stonePurse,
      heading: "Stone Purse",
      body: "Elegant, Graceful and Fashion Ready",
    },
    {
      image: qualityAbayas,
      heading: "Quality Abayas",
      body: "Top Quality, Just for you",
    },
    {
      image: classyHeels,
      heading: "Classy Heels",
      body: "Make a statement with our classy collections",
    },
  ];

  return (
    <div className="px-[5%]">
      <div className=" flex flex-col gap-y-4 sm:gap-y-0 sm:flex-row gap-[2%] items-center mt-[60px]">
        {collectionData.map((item, index) => (
          <section
            key={index}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            className="relative w-full flex-1"
          >
            <img src={item.image} alt={item.heading} className="w-full" />
            <div
              className={`absolute top-16 left-0 right-0 flex flex-col justify-center items-center text-white gap-[11px] px-4`}
            >
              <h2 className="text-2xl font-bold">{item.heading}</h2>
              <p className="text-center">{item.body}</p>
            </div>
            <div
              className={`absolute text-White gap-4 flex flex-col shadow-md items-center font-raleway justify-center bg-opacity-80 bottom-0 right-0 top-0 left-0 bg-Black w-full transition-opacity duration-500 ${
                hoveredItem === index ? "opacity-100" : "opacity-0"
              }`}
            >
              <Button2 text="Shop" link="/" style="bg-White text-black" />
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
