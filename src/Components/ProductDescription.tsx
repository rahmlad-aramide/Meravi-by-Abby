import { useState } from "react";
import { CartBtn } from "./Button/CartBtn";
import formatPrice from "../functions/FormatPrice";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, removeItemFromCart } from "../redux/slice/cartSlice";
import {
  addItemToWishlist,
  removeItemFromWishlist,
} from "../redux/slice/wishlistSlice";
// import { toast } from "react-toastify";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

interface ProductsState {
  product: {
    _id: string | null;

    brand_name: {
      name: string;
      slug: string;
      _id: string;
    } | null;
    name: string;
    quantity: number;
    price: number | null;
    totalPrice: number | null;
    description: string | null;
    image: string[] | null;
    colors: string[] | [];
    sizes: string[] | [];
  };
}

export const ProductDetailsDescription = ({ product }: ProductsState) => {
  // const [selectedCountry, setSelectedCountry] = useState<string>("");
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cartItems = useSelector((state: any) => state.cart.items);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const wishlistItems = useSelector((state: any) => state.wishlist.items);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSize(event.target.value);
  };

  // const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   setSelectedCountry(event.target.value);
  // };
  
  const navigate = useNavigate();

  const handleBrandsSpecific = (slug: string) => {
    const specificBrand = product?.brand_name;
    // console.log(specificBrand)
    if (specificBrand) {
        navigate(`/brands/${slug}`, { state: { specificBrand } });
    } 
  }

  const handleAddToCart = () => {
    if (
      product?._id &&
      product?.name &&
      product?.price &&
      product?.description &&
      product?.image
    ) {
      dispatch(
        addItemToCart({
          id: product._id,
          name: product.name,
          price: product.price,
          totalPrice: product.price * 1,
          description: product.description,
          color: selectedColor,
          size: selectedSize,
          image: product.image[0],
          quantity: 1,
        })
      );
      //   toast.success("You've added item to cart!")
    }
  };
  const handleRemoveFromCart = (productId: string) => {
    dispatch(removeItemFromCart(productId));
    // toast.success("You've removed item from cart!")
  };

  const handleAddToWishlist = () => {
    if (
      product?._id &&
      product?.name &&
      product?.price &&
      product?.description &&
      product?.image
    ) {
      dispatch(
        addItemToWishlist({
          id: product._id,
          name: product.name,
          price: product.price,
          totalPrice: product.price * 1,
          description: product.description,
          image: product.image[0],
          quantity: 1,
        })
      );
      // toast.success("You've added item to Wishlist!");
    }
  };
  const handleRemoveFromWishlist = (productId: string) => {
    dispatch(removeItemFromWishlist(productId));
    // toast.success("You've removed item from wishlist!");
  };

  const isInCart = cartItems.some(
    (item: { id: string | null }) => item.id === product?._id
  );
  const isInWishlist = wishlistItems.some(
    (item: { id: string | null }) => item.id === product?._id
  );

  const truncateText = (text: string, wordLimit: number): string => {
    const words = text.split(" ");
    if (words.length <= wordLimit) {
      return text;
    }
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  const description = product?.description ?? "";

  return (
    <section className="bg-[#f6f6f6] font-outfit p-4 md:p-6">
      <h1
        onClick={() => handleBrandsSpecific(product?.brand_name?.name ? product?.brand_name?.name : "")}
        className="text-[1.2rem] cursor-pointer hover:underline hover:text-blue-500 capitalize font-bold"
      >
        {product?.brand_name?.name}
      </h1>
      <h2 className="text-[1rem] capitalize text-Gray ">
        {product?.name}
      </h2>
      <p className="text-[1rem] my-2">{truncateText(description, 20)}</p>
      <p className="text-[1.1rem] font-medium">
        {formatPrice(product?.price ?? "0")}
      </p>
      {/* <p className="text-[1.1rem] my-2">{product?.description}</p> */}

      {product?.quantity < 1 ? (
        <div>
          <p className="text-[#4e4e4e] font-medium text-[1.3rem] my-5">
            Out of stock
          </p>
        </div>
      ) : (
        <div>
          {product?.colors?.length > 0 && (
            <section className="my-2 flex gap-2">
              <div className=" w-[30%] ">
                <p className="text-[#4e4e4e] font-medium text-sm ">
                  Select Color:
                </p>
              </div>
              <div>
                <div className="flex flex-wrap gap-1">
                  {product?.colors.map((color, index) => (
                    <section
                      className={` flex items-center justify-center rounded-full ${
                        selectedColor === color
                          ? "border-black border-[1.5px]"
                          : ""
                      }`}
                    >
                      <div
                        key={index}
                        className={`h-[18px] w-[18px] rounded-full m-[2px] border-black border-[1.5px] cursor-pointer `}
                        style={{ backgroundColor: color }}
                        title={color} // Tooltip for debugging
                        onClick={() => handleColorSelect(color)}
                      ></div>
                    </section>
                  ))}
                </div>
              </div>
            </section>
          )}
          {product?.sizes.length > 0 && (
            <div className="border-[1px] border-[#4E4E4E] rounded-[5px] shadow-shawdowCart focus:outline-borderHash outline-offset-2 w-full px-3 mt-3">
              <select
                name=""
                id=""
                value={selectedSize}
                className="block focus:outline-none w-full py-2.5 bg-transparent text-outfit text-sm"
                onChange={handleSizeChange}
              >
                <option value="" selected>
                  Select size
                </option>
                {product?.sizes?.map((size, index) => (
                  <option key={index} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="flex gap-2 mt-3 items-center">
            {isInCart ? (
              <div onClick={() => handleRemoveFromCart(product?._id ?? "")}>
                <CartBtn link="" text="Remove from Cart" width="w-full" />
              </div>
            ) : (
              <div onClick={handleAddToCart}>
                <CartBtn link="" text="Add to Cart" width="w-full" />
              </div>
            )}
            <button className="border-[#181818] text-[1.7rem] border-[1px] p-2">
              {isInWishlist ? (
                <div
                  className="text-red-500"
                  onClick={() => handleRemoveFromWishlist(product?._id ?? "")}
                >
                  <IoHeartSharp />
                </div>
              ) : (
                <div onClick={handleAddToWishlist}>
                  <IoHeartOutline />
                </div>
              )}
            </button>
          </div>
        </div>
      )}
      <p className="text-sm text-[#E06E2E] my-3">
        20% off on your first purchase with the code 20WEB, on orders above
        ₦20,000
      </p>
      <p className="flex items-center gap-2 text-sm">
        <svg
          className="shrink-0"
          width="17"
          height="16"
          viewBox="0 0 17 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.6969 7.99967C14.6969 11.6816 11.7121 14.6663 8.03019 14.6663C4.34829 14.6663 1.36353 11.6816 1.36353 7.99967C1.36353 4.31778 4.34829 1.33301 8.03019 1.33301C11.7121 1.33301 14.6969 4.31778 14.6969 7.99967ZM13.3635 7.99967C13.3635 10.9452 10.9757 13.333 8.03019 13.333C5.08467 13.333 2.69686 10.9452 2.69686 7.99967C2.69686 5.05416 5.08467 2.66634 8.03019 2.66634C9.60231 2.66634 11.0155 3.34656 11.9917 4.42873L7.36353 9.05687L5.5016 7.19494C5.24125 6.93459 4.81914 6.93459 4.55879 7.19494C4.29844 7.45529 4.29844 7.8774 4.55879 8.13775L6.42072 9.99968C6.94142 10.5204 7.78564 10.5204 8.30633 9.99967L12.7645 5.54151C13.1472 6.27711 13.3635 7.11313 13.3635 7.99967Z"
            fill="#35383F"
          />
        </svg>
        <span>Free delivering when you buy up to a higher amount</span>
      </p>
      <button className="flex items-center text-Black text-sm my-4 gap-2">
        Find out more
        <svg
          width="17"
          height="16"
          viewBox="0 0 17 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.69694 2.66667C8.69694 2.29848 8.39846 2 8.03027 2C7.66208 2 7.36361 2.29848 7.36361 2.66667V12.0572L4.16834 8.86193C3.908 8.60158 3.48589 8.60158 3.22554 8.86193C2.96519 9.12228 2.96519 9.54439 3.22554 9.80474L7.08746 13.6667C7.60816 14.1874 8.45238 14.1874 8.97308 13.6667L12.835 9.80474C13.0954 9.54439 13.0954 9.12228 12.835 8.86193C12.5747 8.60158 12.1526 8.60158 11.8922 8.86193L8.69694 12.0572V2.66667Z"
            fill="#35383F"
          />
        </svg>
      </button>
    </section>
  );
};
