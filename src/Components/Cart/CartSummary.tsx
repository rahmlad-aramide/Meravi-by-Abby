/* eslint-disable @typescript-eslint/no-explicit-any */
import formatPrice from "../../functions/FormatPrice";
// import { item } from "./ItemCard"

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  quantity: number;
  totalPrice: number;
}

interface SummaryState {
  cartItems: CartItem[];
  subtotal: number;
  flutterPayment: () => void;
}

export const CartSummary = ({
  cartItems,
  subtotal,
  flutterPayment,
}: SummaryState) => {
  return (
    <section className="pb-12 md:px-4 md:sticky top-[10rem]">
      <h2 className="font-medium font-outfit leading-none text-[1.25rem] sm:text-[1.8rem] md:text-[2.2rem] mb-6 text-center border-b-[1px] border-b-borderHash pb-3">
        Summary
      </h2>
      {cartItems?.map((cart: any) => (
        <div className="flex items-center gap-6 border-b-[1px] border-b-[#e9e9e9] py-2">
          <div>
            <img src={cart?.image} className=" w-[5rem] h-[5rem] object-contain " alt="" />
          </div>
          <div className="font-outfit">
            <h3 className="text-sm text-[#4E4E4E]">{cart?.name}</h3>
            <p className="font-medium mt-1 mb-2.5">{cart?.quantity} Item(s)</p>
            {cart?.size && (
              <div className="flex items-center gap-10">
                <p className="font-outfit text-[#4E4E4E] text-sm">
                  Size: {cart?.size}
                </p>
              </div>
            )}
            {cart?.color && (
             <section className="flex gap-1 items-center py-1">
              Color:
               <div
                className={`h-[18px] w-[18px] rounded-full m-[2px]  cursor-pointer `}
                style={{ backgroundColor: cart?.color }}
              ></div>
             </section>
            )}
            <p className="font-medium">
              {formatPrice(cart?.totalPrice ?? "0")}
            </p>
          </div>
        </div>
      ))}
      {subtotal !== null && (
        <div className="flex justify-between font-semibold font-outfit text-base my-8 px-4">
          <h3>Subtotal</h3>
          <p>{formatPrice(subtotal.toString())}</p>
        </div>
      )}
      {/* onClick={flutterPayment} */}
      <div onClick={flutterPayment} className="mx-auto max-w-[80%]">
        <button
          className={` w-full border-Black block text-center text-white text-base border-[1px] font-semibold bg-Black py-3 px-5`}
        >
          Continue
        </button>
      </div>
    </section>
  );
};
