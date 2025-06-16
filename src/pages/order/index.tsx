import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Order } from "@/services/order/types/order.type";
import orderApi from "@/services/order/api/order.api";
import { formatToVND, formatDate } from "@/utils/format";
import routePath from "@/config/route";

const Order = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);
  const fetchOrders = async () => {
    try {
      const response = await orderApi.getListOrder();
      if (response.status == 200) {
        setOrders(response.data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <>
      <h4 className=" text-[30px] lg:text-[35px] font-bold uppercase absolute lg:left-0 left-3 top-0 lg:-top-[90px]">
        Orders
      </h4>
      <div className="border overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#E4E4E4] h-12">
              {["ORDER", "DATE", "STATUS", "TOTAL", "ACTIONS"].map((header) => (
                <th
                  key={header}
                  className="text-[#222] text-sm font-medium px-6 py-3 text-left last:pl-0"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  No orders found
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-t h-14 hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-8 text-sm text-[#222] underline">
                    #{order.orderCode}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#222]">
                    {formatDate(order.createdAt)}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#222]">
                    {order.status}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#222]">
                    {formatToVND(order.totalAmount)} for {order.totalItems}{" "}
                    {order.totalItems > 1 ? "products" : "product"}
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
                      VIEW
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Order;
