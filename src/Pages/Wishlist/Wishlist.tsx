import { useEffect } from "react";
// import pic from "./assets/pic.png";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import formatPrice from "../../functions/FormatPrice";
// import { toast } from "react-toastify";
import { removeItemFromWishlist } from "../../redux/slice/wishlistSlice";
import { addItemToCart } from "../../redux/slice/cartSlice";
import TruncateText from "../../functions/TruncateText";

// const wishlistData = [
//   {
//     id: 1,
//     name: "Balmain",
//   },
//   {
//     id: 2,
//     name: "Balmain",
//   },
// ];

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  quantity: number;
  totalPrice: number;
}


export default function Wishlist() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const wishlistItems = useSelector((state: any) => state.wishlist.items);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const cartItems = useSelector((state: any) => state.wishlist.items);
  const dispatch = useDispatch();
  // console.log("wishlist items in page: ", wishlistItems);

  const handleRemoveFromWishlist = (productId: string) => {
    dispatch(removeItemFromWishlist(productId));
    // toast.success("You've removed item from wishlist!");
  };

  // const isInCart = (productId: string) => {
  //   return cartItems.some((item: { id: string }) => item.id === productId);
  // };

  // const isInCart = cartItems.some(
  //   (item: { id: string | null }) => item.id === product?._id
  // );

  const handleAddToCart = (product: WishlistItem) => {
    if (
      product.id &&
      product.name &&
      product?.price &&
      product?.description &&
      product?.image
    ) {
      dispatch(
        addItemToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          totalPrice: product.price * 1,
          description: product.description,
          color: "",
          size: "",
          image: product.image,
          quantity: 1,
        })
      );
      //   toast.success("You've added item to cart!")
    }
  };

  // const handleRemoveFromCart = (productId: string) => {
  //   dispatch(removeItemFromCart(productId));
  //   // toast.success("You've removed item from cart!")
  // };


  return (
    <div className="mt-16 sm:mt-[7rem] lg:mt-[9rem] min-h-[30vh] pb-10 px-[5%] mb-2 ">
      <section className="flex bg-white items-end gap-1 border-b-[2px] ">
        <h2 className=" font-semibold text-[1.3rem] ssm:text-[1.5rem] sm:text-[1.7rem] md:text-[1.8rem] lg:text-[2.1rem] xxl:text-[2.2rem] ">
          WISHLIST
        </h2>
        <hr className=" my-3 w-[7%] border-red-500 border-[3px] " />
      </section>
      {wishlistItems > 0 && (
        <section className=" font-medium text-[0.9rem] mt-1 ">
        <p>{wishlistItems?.length} LIST</p>
      </section>
      )}

      {/* wishlist items */}
     {wishlistItems.length > 0 ? (
       <section className="py-[2%] flex flex-col gap-6 sm:gap-10 ">
       {wishlistItems?.map((wish: WishlistItem) => (
         <div
           key={wish?.id}
           className="w-[100%] sm:w-[70%] lg:w-[60%] xl:w-[50%] mx-auto flex items-center  justify-between "
         >
           <section className=" w-[20%] sm:w-[18%] ">
             <img src={wish?.image} className=" w-full object-contain h-[10rem] " alt="cloths" />
           </section>
           <section className="w-[75%] flex flex-col gap-4 sm:gap-6 ">
             {/* top part */}
             <div>
               <section className=" justify-between flex">
                 <div>
                   <h3 className=" text-[0.9rem] text-Gray ">{wish?.name}</h3>
                   <p className="text-[1rem] pt-1 font-medium ">
                   {TruncateText(wish?.description, 10)}
                   </p>
                 </div>
                 <div onClick={() => handleRemoveFromWishlist(wish?.id)} className="text-[1.5rem] cursor-pointer text-red-500 ">
                   <IoClose />
                 </div>
               </section>
             </div>
             {/* down part */}
             <div className=" flex items-center justify-between">
               <p className="text-[1rem] font-medium ">{formatPrice(wish?.price)}</p>
               <button
                      onClick={() => handleAddToCart(wish)}
                      className="bg-black text-white py-2 px-4 text-[0.9rem]"
                    >
                      Add to Cart
                    </button>
               {/* {isInCart(wish.id) ? (
                    <button
                      onClick={() => handleRemoveFromCart(wish.id)}
                      className="bg-black text-white py-2 px-4 text-[0.9rem]"
                    >
                      Remove from Cart
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAddToCart(wish)}
                      className="bg-black text-white py-2 px-4 text-[0.9rem]"
                    >
                      Add to Cart
                    </button>
                  )} */}
             </div>
           </section>
         </div>
       ))}
     </section>
     ) : (
      <div className=" py-5 min-h-[30vh] flex justify-center items-center ">
            <p className=" text-[1.5rem] ">No item in Wishlist</p>
          </div>
     )}
    </div>
  );
}
