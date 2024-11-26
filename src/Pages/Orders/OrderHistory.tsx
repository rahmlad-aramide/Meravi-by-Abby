import { useEffect } from "react";
import formatPrice from "../../functions/FormatPrice";
// import Women from "../assets/women-placeholder.png";
import { useGetOrderHistory } from "../../ApiCalls/getOrderHistory";
import { Oval } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface OrderItem {
  _id: string;
  name: string;
  price: number;
  image: string;
  qty: number;
}

interface Order {
  _id: string;
  isDelivered: string;
  orderItems: OrderItem[];
  createdAt: string;
  totalPrice: number;
}

export default function OrderHistory() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  const navigate = useNavigate();

  const { isLoading, data } = useGetOrderHistory();
  const orders: Order[] = data?.data?.data?.orders || [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const authenticatedUser = useSelector((state: any) => state.auth.user);

  useEffect(() => {
    if (!authenticatedUser) {
      toast.info("You are not logged in.");
      navigate("/");
    }
  }, [authenticatedUser, navigate]);

  return (
    <div className="mt-[6rem] ssm:mt-[6.5rem] sm:mt-[7rem] lg:mt-[9rem] min-h-[30vh] px-[5%] mb-2">
      <div className=" pb-4 sm:pb-0 ">
        <section className="flex items-end gap-1 border-b-[2px]">
          <h2 className="font-semibold text-[1.3rem] ssm:text-[1.5rem] sm:text-[1.7rem] md:text-[1.8rem] lg:text-[2.1rem] xxl:text-[2.2rem]">
            ORDER HISTORY
          </h2>
          <hr className="my-3 w-[12%] sm:w-[7%] border-red-500 border-[2px] sm:border-[3px]" />
        </section>
        {orders?.length > 0 && (
          <section className="font-medium text-[0.85rem] sm:text-[0.9rem] mt-1">
            <p>{orders?.length} ORDERS</p>
          </section>
        )}
      </div>

      {isLoading ? (
        <div className="flex justify-center text-white items-center min-h-[15vh] sm:min-h-[30vh]">
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
          {orders?.length > 0 ? (
            <section className="py-[2%] flex flex-col gap-7 sm:gap-10">
              {orders?.map((order: Order) => (
                <div
                  key={order._id}
                  className="w-[100%] sm:w-[70%] lg:w-[60%] xl:w-[50%] border-b-[1px] mx-auto flex flex-col gap-2"
                >
                  <section className="flex justify-between items-center border-b-[1px] pb-2">
                    <div>
                      <p className="text-[0.8rem] pt-1 text-gray-500">
                        Order Date:{" "}
                        {new Date(order.createdAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                      <p className="text-[0.9rem] sm:text-[1rem] pt-1 font-medium">
                        Total Items:{" "}
                        {order?.orderItems?.reduce(
                          (acc, item) => acc + item?.qty,
                          0
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-[0.8rem]  pb-1 text-gray-500">
                        Delivery Status:{" "}
                        {order.isDelivered ? (
                          <span>Delivered</span>
                        ) : (
                          <span>Not Delivered</span>
                        )}
                      </p>
                      <p className="text-[0.9rem] sm:text-[1rem] font-medium">
                        Total Price:{" "}
                        {formatPrice(
                          order.orderItems.reduce(
                            (acc, item) => acc + item?.price,
                            0
                          )
                        )}
                      </p>
                    </div>
                  </section>
                  {order?.orderItems.map((item: OrderItem) => (
                    <div
                      key={item._id}
                      className="w-full flex items-center justify-between"
                    >
                      <section className="w-[20%] sm:w-[18%]">
                        <img
                          src={item?.image}
                          className="w-full object-contain h-[5rem] sm:h-[8rem]"
                          alt="product"
                        />
                      </section>
                      <section className=" w-[70%] s,:w-[75%] flex flex-col gap-2 sm:gap-2">
                        <div>
                          <section className="justify-between flex">
                            <div>
                              <h3 className="text-[0.9rem] text-Gray">
                                {item?.name}
                              </h3>
                              <p className="text-[0.8rem] pt-1 text-gray-500">
                                Quantity: {item?.qty}
                              </p>
                            </div>
                          </section>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-[0.9rem] sm:text-[1rem] font-medium">
                            {formatPrice(item?.price)}
                          </p>
                        </div>
                      </section>
                    </div>
                  ))}
                </div>
              ))}
            </section>
          ) : (
            <div className="py-5 min-h-[30vh] flex justify-center items-center">
              <p className="text-[1.5rem]">No Orders Found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
