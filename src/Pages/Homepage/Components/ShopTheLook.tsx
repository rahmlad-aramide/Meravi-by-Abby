import { Link } from "react-router-dom";
import { useGetProductsMale } from "../../../ApiCalls/getProductsMale";
import formatPrice from "../../../functions/FormatPrice";
// import Shop from "../assets/Shop.png";
// import FemaleShop from "../assets/FemaleShop.png";
import { useGetProductsFemale } from "../../../ApiCalls/getProductsFemale";
import { Oval } from "react-loader-spinner";
import TruncateText from "../../../functions/TruncateText";

interface ProductsState {
  _id: string | null;
  name: string;
  brand_name: {
    name: string;
  } | null;
  price: string | null;
  description: string | null;
  image: string[] | null;
  quantity: number;
}

interface HomePageProps {
  gender: "male" | "female";
}

export default function ShopTheLook({ gender }: HomePageProps) {
  const { isLoading: LoadingMale, data: productsDataMale } =
    useGetProductsMale();
  const { isLoading: LoadingFemale, data: productsDataFemale } =
    useGetProductsFemale();
  const ProductsFemale = productsDataFemale?.data?.data?.availableProducts;
  const ProductsMale = productsDataMale?.data?.data?.availableProducts;

  const Products = gender === "male" ? ProductsMale : ProductsFemale;
  const Loading = gender === "male" ? LoadingMale : LoadingFemale;

  // Filter out products with quantity less than 1
  const ShopProducts =
    Products?.filter((product: ProductsState) => product?.quantity >= 1) || [];

  return (
    <div className="  px-[5%] ">
      <h1 className=" font-semibold text-[1.4rem] text-center ">
        SHOP THE LOOK
      </h1>
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
        <div>
          {ShopProducts && ShopProducts.length > 0 ? (
            <section className=" mt-[5%] sm:mt-[3%] flex items-stretch justify-between">
              <div className="hidden sm:block w-[37%] lg:w-[35%] ">
                <img
                  src={
                    gender === "male"
                      ? "https://res.cloudinary.com/dzjazulfw/image/upload/v1725373100/Midpage_Banner_Male_2_stsmh5.png"
                      : "https://res.cloudinary.com/dzjazulfw/image/upload/v1725379313/Midpage_Banner_Female_2_dkqbqs.png"
                  }
                  className=" w-full "
                  alt="Shop Image"
                />
              </div>
              <div className="w-[100%] sm:w-[62%] flex gap-y-2 lg:gap-y-4 justify-between flex-wrap ">
                {ShopProducts?.slice(0, 4).map((shop: ProductsState) => (
                  <Link
                    to={`/product/details/${shop?._id}`}
                    key={shop?._id}
                    className="w-[49%] flex justify-center items-center bg-[#F6F6F6] pb-[2%] sm:pb-0 px-[1%]  "
                  >
                    <div>
                      <div className=" w-[100%] flex items-center mx-auto ">
                        <img
                          src={shop?.image?.[0] ?? "none"}
                          className=" w-full h-[8rem] ssm:h-[10rem] sm:h-[15rem] object-contain "
                          alt=""
                        />
                      </div>
                      <div className=" flex flex-col mt-[7%] gap-1  items-center ">
                        <h2 className=" font-medium leading-none text-[1rem] h-8 text-center hover:text-blue-500 hover:underline lg:text-[1.1rem] ">
                          {TruncateText(shop?.name, 2)}
                        </h2>
                        <p className=" text-[0.9rem] lg:text-[1rem] font-bold mb-3 ">
                          {TruncateText(
                            shop?.brand_name?.name
                              ? shop?.brand_name?.name
                              : "",
                            2
                          )}
                        </p>
                        <h4 className="font-normal text-[1rem] lg:text-[1.1rem]">
                          {formatPrice(shop?.price ?? "0")}
                        </h4>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ) : (
            <div className=" text-[1.2rem] sm:text-[1.5rem]  flex justify-center  items-center min-h-[10vh] sm:min-h-[20vh] ">
              <p>No Products available here </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
