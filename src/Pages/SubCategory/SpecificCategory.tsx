/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useMemo, useRef } from "react";
import { useGetSubCategory } from "../../ApiCalls/getSubCategory";
import { Oval } from "react-loader-spinner";
import { useGender } from "../../GenderContext";

export default function SpecificCategory() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const location = useLocation();
  const { gender } = useGender();
  const { specificCategory } = location.state || { specificCategory: [] };
  // const brandsItems = useSelector((state: any) => state.brands.brands);
  const [searchTerm, setSearchTerm] = useState("");
 

  const { data, isLoading } = useGetSubCategory(specificCategory._id ?? "", gender);
  const subCategoryData = data?.data?.data;

  // console.log("specific:", subCategoryData);

  const allSubCategory = gender === "male" ? subCategoryData : subCategoryData;

  const filteredBrands = allSubCategory?.filter((brand: any) =>
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
      const elementPosition =
        section.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const navigate = useNavigate();

  // const handleBrandsSpecific = (slug: string) => {
  //   const specificBrand = allBrands.find((brand: any) => brand.slug === slug);
  //   if (specificBrand) {
  //     navigate(`/brands/${slug}`, { state: { specificBrand } });
  //   }
  // };

  const GoToSpecificPage = (categorySlug: string, slug: string) => {
    const specificSubCategory = subCategoryData.find(
      (sub: any) => sub.slug === slug
    );
    if (specificSubCategory) {
      navigate(`/category/${categorySlug}/${slug}`, {
        state: { specificSubCategory }
      });
    }
  };

  return (
    <div className="pt-20  relative pb-8 sm:pt-28 lg:pt-36 px-[5%]">
      {isLoading ? (
        <div className=" flex justify-center text-white items-center min-h-[15vh] sm:min-h-[30vh] ">
        <Oval
          visible={true}
          height="50"
          width="50"
          color="white"
          ariaLabel="oval-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
      ) : (
        <section>
          {uniqueLetters.length > 0 ? (
            <div className="">
            <section className="my-2 flex bg-white  gap-6 ">
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
              <h1 className="text-[1.6rem] sm:text-[2rem] lg:text-[2.2rem]">
                The <span className=" lowercase ">{specificCategory?.name} </span> you
                love
              </h1>
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
                      onClick={() => GoToSpecificPage( brand?.category?.slug, brand?.slug)}
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
          ) : (
            <div className=" text-[1.2rem] sm:text-[1.5rem] flex justify-center  items-center min-h-[10vh] sm:min-h-[20vh] ">
            <p>No sub categories available here </p>
          </div>
          )}
        </section>
      )}
    </div>
  );
}
