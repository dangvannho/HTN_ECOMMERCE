import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Order } from "@/services/order/types/order.type";
import orderApi from "@/services/order/api/order.api";
import { formatToVND, formatDate } from "@/utils/format";
import routePath from "@/config/route";

const Order = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);
  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const response = await orderApi.getListOrder();
      if (response.status == 200) {
        setOrders(response.data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h4 className="heading-element">ĐƠN HÀNG</h4>
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-2"></div>
        </div>
      ) : (
        <>
          <div className="border overflow-hidden hidden md:block">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#E4E4E4] h-12">
                  {["ĐƠN HÀNG", "NGÀY ĐẶT", "TỔNG TIỀN", "CHI TIẾT"].map(
                    (header) => (
                      <th
                        key={header}
                        className="text-[#222] text-sm font-medium px-6 py-3 text-left last:pl-0"
                      >
                        {header}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-4 text-gray-500">
                      Không tìm thấy đơn hàng nào
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order._id} className="border-t h-14 ">
                      <td className="px-6 py-8 text-sm text-[#222]">
                        <p
                          className="cursor-pointer hover:underline"
                          onClick={() =>
                            navigate(
                              routePath.orderDetail.replace(":id", order._id)
                            )
                          }
                        >
                          {order.orderCode}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-sm text-[#222]">
                        {formatDate(order.createdAt)}
                      </td>
                      {/* <td className="px-6 py-4 text-sm text-[#222]">
                      {order.status}
                    </td> */}
                      <td className="px-6 py-4 text-sm text-[#222]">
                        {formatToVND(order.finalAmount)} cho {order.totalItems}{" "}
                        {order.totalItems > 0 && "sản phẩm"}
                      </td>
                      <td className="w-[153px]">
                        <button
                          className="px-[45px] py-[10px] bg-[#222] text-white text-sm font-medium"
                          onClick={() =>
                            navigate(
                              routePath.orderDetail.replace(":id", order._id)
                            )
                          }
                        >
                          XEM
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile */}
          <div className="block md:hidden space-y-4">
            {orders.length === 0 ? (
              <div className="text-center py-4 text-gray-500">
                Không tìm thấy đơn hàng nào
              </div>
            ) : (
              orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white rounded-xl shadow p-4 border"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-[#222]">
                      {order.orderCode}
                    </span>
                  </div>
                  <div className="text-sm text-[#222] mb-1">
                    {formatDate(order.createdAt)}
                  </div>
                  <div className="text-sm text-[#222] mb-1">
                    Tổng Số Tiền ({order.totalItems} Sản phẩm):{" "}
                    <span className="font-bold">
                      {formatToVND(order.finalAmount)}
                    </span>
                  </div>
                  <button
                    className="mt-2 w-full border border-[#FF5722] text-[#FF5722] hover:bg-[#FF5722] hover:text-white  rounded py-2 font-medium"
                    onClick={() =>
                      navigate(routePath.orderDetail.replace(":id", order._id))
                    }
                  >
                    Xem
                  </button>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Order;
