// import Button from "../../../Components/Button/Button";
import { useEffect, useState } from "react";


// Import Swiper styles
import "swiper/css";
// import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { useGetProductsMale } from "../../ApiCalls/getProductsMale";
// import { useGetProductsFemale } from "../../ApiCalls/getProductsFemale"
import formatPrice from "../../functions/FormatPrice";
import { useGender } from "../../GenderContext";
import { useGetProductsFemale } from "../../ApiCalls/getProductsFemale";
import TruncateText from "../../functions/TruncateText";



interface ProductsState {
  _id: string | null;
  name: string;
  brand_name: {
    name: string;
  } | null;
  price: string | null;
  description: string | null;
  image: string[] | null;
  quantity: number
}

function shuffleArray(array: ProductsState[]) {
  return array.sort(() => Math.random() - 0.5);
}

export default function NewSeason() {
  const [slidesPerView, setSlidesPerView] = useState(window.innerWidth < 640 ? 2 : 4);
  const { isLoading: LoadingMale, data: productsDataMale } = useGetProductsMale();
  const { isLoading: LoadingFemale,  data: productsDataFemale } = useGetProductsFemale();
  const ProductsFemale = productsDataFemale?.data?.data?.availableProducts || [];
  const ProductsMale = productsDataMale?.data?.data?.availableProducts || [];

  const { gender } = useGender();

  const Loading = gender === "male" ? LoadingMale : LoadingFemale;

  useEffect(() => {
    const handleResize = () => {
      setSlidesPerView(window.innerWidth < 640 ? 2 : 4);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const linkClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }

  const Products = gender === "male" ? ProductsMale : ProductsFemale;

  // Filter out products with quantity less than 1
  const newProducts = shuffleArray(Products?.filter((product: ProductsState) => product?.quantity >= 1) || []);

  return (
    <div className="py-[5%] px-[5%] relative ">
      <div className="">
       <section className=" flex flex-col sm:flex-row gap-6 sm:gap-0 justify-between">
       <div className="flex  items-center gap-2  ">
          <h2 className=" font-semibold text-[1.3rem] ssm:text-[1.5rem] sm:text-[1.7rem] md:text-[1.8rem] lg:text-[2.1rem] xxl:text-[2.2rem] ">
          You May Also Like
          </h2>
          <hr className=" my-3 w-[5rem] border-red-500 border-[3px] " />
        </div>
       </section>

       {Loading ? (
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
        <section className=" mt-[1%] ">
          <Swiper
            spaceBetween={20}
            slidesPerView={slidesPerView}
            navigation={true}
            pagination={false}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay, Navigation, Pagination]}
            className="mySwiper"

          >
            {newProducts?.map((cloth: ProductsState) => (
              <SwiperSlide>
                <Link to={`/product/details/${cloth?._id}`} onClick={linkClick} key={cloth?._id} className="px-[10%] ">
                  <div>
                    <img src={cloth?.image?.[0] ?? "none"} className="w-full h-[10rem] sm:h-[15rem] object-contain " alt="" />
                  </div>
                  <div className=" flex flex-col mt-[7%] gap-1  items-center ">
                  <h2 className=" font-medium leading-none text-[1rem] hover:text-blue-500 hover:underline lg:text-[1.1rem] ">
                            {TruncateText(cloth?.name, 3)}
                          </h2>
                          <p className=" text-[0.9rem] lg:text-[1rem] font-bold mb-3 ">
                            {TruncateText(
                              cloth?.brand_name?.name
                                ? cloth?.brand_name?.name
                                : "",
                              2
                            )}
                          </p>
                    <h4 className="font-normal text-[1rem] lg:text-[1.1rem]">
                      {formatPrice(cloth?.price ?? "0")}
                    </h4>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
       )}
      </div>
    </div>
  );
}
