import { useDispatch } from "react-redux";
import item from "../../assets/item.png";
import formatPrice from "../../functions/FormatPrice";
import { removeItemFromCart, updateCartItem } from "../../redux/slice/cartSlice";
// import { toast } from "react-toastify";
import { IoClose } from "react-icons/io5";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useEffect, useState } from "react";

interface CartItem {
  id: string;
  name: string;
  color: string;
  size: string;
  price: number;
  image: string;
  description: string;
  quantity: number;
  totalPrice: number;
}

interface CartState {
  cartItem: CartItem;
}

export { item };

export const Items = ({ cartItem }: CartState) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(cartItem.quantity);
  const [totalPrice, setTotalPrice] = useState(cartItem.price * cartItem.quantity);

  useEffect(() => {
    setTotalPrice(cartItem.price * quantity);
  }, [quantity, cartItem.price]);

  const handleRemoveFromCart = (productId: string) => {
    if (productId) {
      dispatch(removeItemFromCart(productId));
      // toast.success("You've removed the item from the cart!");
    }
  };

  const handleIncrement = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + 1;
      const newTotalPrice = cartItem.price * newQuantity;
      dispatch(updateCartItem({ ...cartItem, quantity: newQuantity, totalPrice: newTotalPrice }));
      return newQuantity;
    });
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) => {
      if (prevQuantity > 1) {
        const newQuantity = prevQuantity - 1;
        const newTotalPrice = cartItem.price * newQuantity;
        dispatch(updateCartItem({ ...cartItem, quantity: newQuantity, totalPrice: newTotalPrice }));
        return newQuantity;
      }
      return prevQuantity;
    });
  };

  return (
    <div className="flex items-center gap-8 border-b-[#E9E9E9] border-b-[1px] pt-6 pb-2 pl-4 sm:pl-8 pr-4 sm:pr-6">
      <div className="">
        <img
          src={cartItem.image}
          className="w-[5rem] h-[7rem] object-contain"
          alt="Product Image"
        />
      </div>
      <div className="grow">
        <div className="flex items-center justify-between">
          <h3 className="font-outfit font-semibold text-[#4E4E4E] text-base">
            {cartItem.name}
          </h3>
          <button className="text-red-500 text-[1.3rem]" onClick={() => handleRemoveFromCart(cartItem.id)}>
            <IoClose />
          </button>
        </div>
        <p className="font-outfit text-base font-normal text-Black  my-1">
          {cartItem.quantity} Item(s)
        </p>
        {cartItem?.size && (
              <div className="flex items-center gap-10">
                <p className="font-outfit text-[#4E4E4E] text-base">
                  Size: {cartItem?.size}
                </p>
              </div>
            )}
            {cartItem?.color && (
             <section className="flex gap-1 items-center py-1">
              Color:
               <div
                className={`h-[18px] w-[18px] rounded-full m-[2px]  cursor-pointer `}
                style={{ backgroundColor: cartItem?.color }}
              ></div>
             </section>
            )}
        <div className="flex items-center justify-between mt-1">
          <p className="text-base font-medium font-outfit text-Black">
            {formatPrice(totalPrice.toFixed(2))}
          </p>
          <div className="flex items-center border-borderCartActions border-[1px] w-fit px-2 gap-3">
            <button onClick={handleDecrement}>
              <FaMinus />
            </button>
            <p className="font-medium">{quantity}</p>
            <button onClick={handleIncrement}>
              <FaPlus />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
