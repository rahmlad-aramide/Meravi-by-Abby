/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { DeliveryAddress } from "../Components/Cart/Delivery";
import { CartSummary } from "../Components/Cart/CartSummary";
import { Payment } from "../Components/Cart/Payment";
import { Review } from "../Components/Cart/Review";
import { useLocation, useNavigate } from "react-router-dom";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearCart } from "../redux/slice/cartSlice";
import { handleOrders } from "../ApiCalls/handleOrders";
import { handleOrdersPaid } from "../ApiCalls/handleOrdersPaid";

interface UserState {
  auth: {
    user: {
      firstName: string;
      lastName: string;
      email: string;
      token: string;
      phoneNumber: number;
      _id: string;
    } | null;
  };
}

interface OrderState {
  name: string | null;
  quantity: number | null;
  image: string | null;
  totalPrice: number | null;
  id: string | null;
  size: string | null;
  color: string | null;
}

const CheckOut = () => {
  const [selectedButton, setSelectedButton] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authenticatedUser = useSelector((state: UserState) => state.auth.user);
  const location = useLocation();
  const { cartItems, subtotal } = location.state || {
    cartItems: [],
    subtotal: 0,
  };

  const [deliveryLocation, setDeliveryLocation] = useState("");
  // console.log("delivery location from parent", deliveryLocation);

  // Callback function to receive delivery location from DeliveryAddress component
  const handleDeliveryLocationChange = (location: string) => {
    setDeliveryLocation(location);
  };

  // console.log("cart items in checkout", cartItems);
  // console.log("subtotal in checkout", subtotal);
  //   console.log("user", authenticatedUser);

  const useHandleSummarySubmit = () => {
    if (deliveryLocation !== "") {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useSubmitFlutter();
    } else {
      toast.error("Please input your delivery location");
    }
  };

  const setActiveTab = (tab: string) => {
    switch (tab) {
      case "address":
        return "address";
      case "payment":
        return "payment";
      case "review":
        return "review";
      default:
        return "address";
    }
  };

  const activeTabs = setActiveTab(selectedButton);

  // send order details
  const orderItems = cartItems.map((item: OrderState) => ({
    qty: item?.quantity,
    name: item?.name,
    size: item?.size,
    color: item?.color,
    image: item?.image,
    price: item?.totalPrice,
    product: item?.id,
  }));
  const orderDetails = {
    orderItems,
    deliveryAddress: {
      country: "Nigeria",
      city: "Lagos",
      address: deliveryLocation,
    },
    paymentMethod: "card",
    itemsPrice: subtotal,
    taxPrice: 0,
    deliveryPrice: 0,
    totalPrice: subtotal,
    user: authenticatedUser?._id,
  };
  // console.log("Data gotten: ", orderDetails);

  const token = authenticatedUser?.token

  // console.log("token: ", token);
  

  const handleSendOrderDetails = async () => {
    const data: any = orderDetails;
    // console.log("Data being sent: ", data);
  
    try {
      const orderResponse = await handleOrders({ data, token });
  
      if (orderResponse) {
        console.log("order id", orderResponse?._id);
        
        await handleOrdersPaid({ token, orderId: orderResponse?._id});
      } else {
        toast.error("Order ID not returned");
      }
    } catch (error: any) {
      // console.log(error);
    }
  };

  // flutter integration starts
  const useSubmitFlutter = () => {
    // const flutterKey = import.meta.env.VITE_FLUTTERWAVE_KEY;
    // test key below
    const flutterKey = import.meta.env.VITE_TEST_FLUTTERWAVE_KEY;

    const config = {
      public_key: flutterKey,
      tx_ref: Date.now().toString(),
      amount: subtotal,
      currency: "NGN",
      payment_options: "card,mobilemoney,ussd",
      customer: {
        email: authenticatedUser?.email ?? "",
        phone_number: authenticatedUser?.phoneNumber?.toString() ?? "",
        name: authenticatedUser?.firstName ?? "",
        lastName: authenticatedUser?.lastName ?? "",
      },
      customizations: {
        title: "my Payment Title",
        description: "Payment for Training",
        logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
        metadata: {
          email: authenticatedUser?.email ?? "",
          phone_number: authenticatedUser?.phoneNumber?.toString() ?? "",
          name: authenticatedUser?.firstName ?? "",
          lastName: authenticatedUser?.lastName ?? "",
        },
      },
    };

    const handleFlutterPayment = useFlutterwave(config);

    handleFlutterPayment({
      // the callback has a "response if i want to see it, just console log it"
      callback: () => {
        closePaymentModal();
        navigate("/");
        handleSendOrderDetails();
        dispatch(clearCart());
        // toast.success("You've completed your payment!");
      },
      onClose: () => {},
    });
  };
  // flutter integration ends

  return (
    <div className="pt-20 pb-8 sm:pt-36 px-[5%] md:grid grid-cols-[2fr_1fr] gap-[5%] relative">
      <div>
        <div className="flex gap-6 sm:gap-12 mt-8">
          <button
            style={{ color: activeTabs === "address" ? "Black" : "#999999" }}
            className="grow font-outfit font-bold text-base flex gap-1 items-center"
            onClick={() => setSelectedButton("address")}
          >
            <span>Address</span>
            <span className="inline-block h-[1.5px] bg-Black w-full max-w-[170px]"></span>
          </button>
          {/* <button
                        style={{ color: activeTabs === 'payment' ? 'Black' : '#999999' }}
                        className='grow font-outfit font-bold text-base flex gap-1 items-center'
                        onClick={() => setSelectedButton('payment')}
                    >
                        <span>Payment</span>
                        <span className="inline-block h-[1.5px] bg-Black w-full max-w-[170px]"></span>
                    </button>
                    <button
                        onClick={() => setSelectedButton('review')}
                        style={{ color: activeTabs === 'review' ? 'Black' : '#999999' }}
                        className='grow font-outfit font-bold text-base flex gap-1 items-center'
                    >
                        <span>Review</span>
                        <span className="inline-block h-[1.5px] bg-Black w-full max-w-[170px]"></span>
                    </button> */}
        </div>
        {activeTabs === "address" ? (
          <DeliveryAddress
            onDeliveryLocationChange={handleDeliveryLocationChange}
          />
        ) : activeTabs === "payment" ? (
          <Payment />
        ) : activeTabs === "review" ? (
          <Review />
        ) : null}
      </div>
      <CartSummary
        flutterPayment={useHandleSummarySubmit}
        cartItems={cartItems}
        subtotal={subtotal}
      />
    </div>
  );
};

export default CheckOut;
