/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { CartBtn } from "../Button/CartBtn";
import { Items } from "./ItemCard";
import formatPrice from "../../functions/FormatPrice";
import { useNavigate } from "react-router-dom";
import Auth from "../auth/Auth";
import { useState } from "react";
import { toast } from "react-toastify";

interface Props {
  close: () => void;
}

// interface CartState {

// }

export const CartItems = ({ close }: Props) => {
  const cartItems = useSelector((state: any) => state.cart.items);
  const authenticatedUser = useSelector((state: any) => state.auth.user);
  const [showAuth, setShowAuth] = useState<boolean>(false);
  const navigate = useNavigate();
  // console.log("cart:", cartItems);
  // console.log("user:", authenticatedUser?.verified);

  const handleCheckoutClick = () => {
    if (authenticatedUser && authenticatedUser?.verified === true) {
        navigate("/checkout", { state: { cartItems, subtotal: allTotalPrice } });
    } else if (authenticatedUser && authenticatedUser?.verified !== true) {
      navigate("/resend-verification");
      close();
      toast.info("Please verify your mail")
     } else {
     setShowAuth(!showAuth);
     close();
     toast.info("Please log in")
    }
    close();
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total: number, item: any) => {
      return total + item.totalPrice;
    }, 0);
  };

  const allTotalPrice = calculateTotalPrice();

  return (
    <div className="fixed inset-0 z-100 py-8 sm:py-0 bg-transparentDark">
      <div className="max-w-[650px] w-[95%] bg-White pt-8 pb-16 min-h-[100vh] max-h-[100vh] overflow-y-auto mx-auto sm:mr-0  sm:ml-auto">
        <header className="flex justify-between border-b-[1px] border-b-borderHash mx-4 sm:mx-6">
          <h2 className="font-semibold text-10 font-outfit text-[1.8rem] md:text-[2.2rem]">
            Your Cart
          </h2>
          <button onClick={close}>
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.1339 10.3661C11.6457 9.87796 10.8543 9.87796 10.3661 10.3661C9.87796 10.8543 9.87796 11.6457 10.3661 12.1339L13.2323 15L10.3662 17.8662C9.878 18.3543 9.878 19.1458 10.3662 19.6339C10.8543 20.1221 11.6458 20.1221 12.1339 19.6339L15 16.7678L17.8661 19.6339C18.3543 20.1221 19.1457 20.1221 19.6339 19.6339C20.122 19.1457 20.122 18.3543 19.6339 17.8661L16.7678 15L19.6339 12.1339C20.1221 11.6458 20.1221 10.8543 19.6339 10.3662C19.1458 9.878 18.3543 9.878 17.8662 10.3662L15 13.2323L12.1339 10.3661Z"
                fill="black"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15 25C20.5228 25 25 20.5228 25 15C25 9.47715 20.5228 5 15 5C9.47715 5 5 9.47715 5 15C5 20.5228 9.47715 25 15 25ZM15 27.5C21.9036 27.5 27.5 21.9036 27.5 15C27.5 8.09644 21.9036 2.5 15 2.5C8.09644 2.5 2.5 8.09644 2.5 15C2.5 21.9036 8.09644 27.5 15 27.5Z"
                fill="#35383F"
              />
            </svg>
          </button>
        </header>
        {cartItems.length > 0 ? (
          <>
            <div>
              {cartItems.map((cart: any) => (
                <div key={cart?._id}>
                  <Items cartItem={cart} />
                </div>
              ))}
            </div>
            <div className="px-4 sm:px-6">
              <div className="flex justify-between font-semibold font-outfit text-base my-8 px-4">
                <h3>Subtotal</h3>
                <p>{formatPrice(allTotalPrice)}</p>
              </div>
              <div onClick={handleCheckoutClick}>
                <CartBtn text="Go To Checkout" width="w-full" link="" />
              </div>
            </div>
            <button
              onClick={close}
              className="border-b-[1px] border-b-[#4E4E4E] text-[#4e4e4e] block mx-auto font-outfit py-1 text-sm my-6"
            >
              Continue Shopping
            </button>
          </>
        ) : (
          <div className="px-4 sm:px-6 py-10 ">
            <p className=" text-[1.5rem] text-center sm:text-[1.4rem] ">No item in cart</p>
          </div>
        )}
      </div>

      {showAuth ? (
        <div className="fixed z-[200] ">
          <Auth close={() => setShowAuth(!showAuth)} /> 
        </div>
      )
      : null}
    </div>
  );
};
