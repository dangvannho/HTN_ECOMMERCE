import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { formatDate, formatToVND } from "@/utils/format";
import type { Order } from "@/services/order/types/order.type";
import orderApi from "@/services/order/api/order.api";

const OrderDetail = () => {
  const { id } = useParams();
  const [orderData, setOrderData] = useState<Order | null>(null);

  useEffect(() => {
    fetchOrderData();
  }, []);

  const fetchOrderData = async () => {
    try {
      const response = await orderApi.getOrderDetail(id || "");
      if (response.status == 200) {
        setOrderData(response.data);
      }
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  // const getStatusColor = (status: string) => {
  //   switch (status) {
  //     case "pending":
  //       return "bg-yellow-100 text-yellow-800";
  //     case "completed":
  //       return "bg-green-100 text-green-800";
  //     case "cancelled":
  //       return "bg-red-100 text-red-800";
  //     default:
  //       return "bg-gray-100 text-gray-800";
  //   }
  // };

  return (
    <div className="xl:max-w-5xl 2xl:max-w-7xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6 border">
        {/* Order Header */}
        <div className="border-b pb-4 mb-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Order Details</h1>
            {/* <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                orderData?.status || ""
              )}`}
            >
              {orderData?.status}
            </span> */}
          </div>
          <p className="text-gray-600 mt-2">Order ID: {orderData?.orderCode}</p>
        </div>

        {/* Order Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h2 className="text-lg font-semibold mb-3">Order Information</h2>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Order Date: </span>
                {formatDate(orderData?.createdAt || "")}
              </p>
              <p>
                <span className="font-medium">Payment Method: </span>
                {orderData?.paymentMethod}
              </p>
              <p>
                <span className="font-medium">Shipping Address: </span>
                {orderData?.address}
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-3">Order Summary</h2>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Total Items: </span>{" "}
                {orderData?.totalItems}
              </p>
              <p>
                <span className="font-medium">Discount:</span>{" "}
                {formatToVND(orderData?.discountAmount || 0)}
              </p>
              <p className="text-lg font-semibold text-primary">
                <span className="font-medium">Total Amount:</span>{" "}
                {formatToVND(orderData?.finalAmount || 0)}
              </p>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Ordered Items</h2>
          <div className="border rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Unit Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orderData?.items.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {item.productName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 ml-5">
                        {item.quantity}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatToVND(item.price)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatToVND(item.price * item.quantity)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
