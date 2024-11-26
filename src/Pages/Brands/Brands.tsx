/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useMemo, useRef } from "react";

export default function Brands() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const brandsItems = useSelector((state: any) => state.brands.brands);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const { gender } = location.state || { gender: "male" };

  console.log("gender:", gender);

  const allBrands = gender === "male" ? brandsItems : brandsItems
  

  const filteredBrands = allBrands?.filter((brand: any) =>
    brand?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const brandsByLetter = useMemo(() => {
    return filteredBrands?.reduce((acc: any, brand: any) => {
      const firstLetter = brand?.name[0].toUpperCase();
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(brand);
      return acc;
    }, {});
  }, [filteredBrands]);

  const uniqueLetters = useMemo(() => {
    if (!brandsByLetter) {
      return [];
    }
    const letters = Object.keys(brandsByLetter).sort();
    return letters;
  }, [brandsByLetter]);

  const sectionRefs = useRef(new Map());
  const headerOffset = 130; 

  const scrollToSection = (letter: string) => {
    const section = sectionRefs.current.get(letter);
    if (section) {
      const elementPosition = section.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const navigate = useNavigate();

  const handleBrandsSpecific = (slug: string) => {
    const specificBrand = allBrands.find((brand: any) => brand.slug === slug);
    if (specificBrand) {
        navigate(`/brands/${slug}`, { state: { specificBrand } });
    } 
  }

  return (
    <div className="pt-16  relative pb-8 sm:pt-28 lg:pt-36 px-[5%]">
      <section className="my-2 flex flex-wrap bg-white gap-4 sm:gap-6 ">
        {uniqueLetters?.map((alpha, index) => (
          <button
            onClick={() => scrollToSection(alpha)}
            className=" hover:text-[blue]  "
            key={index}
          >
            {alpha}
          </button>
        ))}
      </section>
      <section className="py-[3%] flex flex-col gap-2 sm:gap-0 sm:flex-row items-start sm:items-center justify-between">
        <h1 className="text-[1.6rem] sm:text-[2rem] lg:text-[2.2rem]">The brands you love</h1>
        <div className="w-[100%] sm:w-[30%]">
          <div className="border-[2px] border-black border-solid rounded-md px-[2%] py-2 ssm:py-3 sm:py-1">
            <input
              type="text"
              className="outline-none w-full"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* section for all available brands by alphabet */}
      {uniqueLetters?.map((letter) => (
        <section
          key={letter}
          className="mb-5 sm:mb-10 mt-4 sm:mt-0 "
          ref={(el) => sectionRefs.current.set(letter, el)}
        >
          <h2 className="text-[2.2rem] font-medium">{letter}</h2>
          <div className="pt-[1%] flex  flex-wrap gap-x-5 ssm:gap-x-8  sm:gap-x-0 gap-y-2">
            {brandsByLetter[letter].map((brand: any) => (
              <button
                onClick={() => handleBrandsSpecific(brand?.slug)}
                className="font-medium text-left text-[1rem] w-auto sm:w-[25%] hover:text-[blue]"
                key={brand?._id}
              >
                {brand?.name}
              </button>
            ))}
          </div>
          <section className="pt-10">
            <hr className="border-[1px]" />
          </section>
        </section>
      ))}
    </div>
  );
}
