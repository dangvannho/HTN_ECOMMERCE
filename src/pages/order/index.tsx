const orders = [
  {
    orderId: "2418",
    date: "2020-10-27",
    status: "On hold",
    total: 1200.65,
    itemCount: 3,
  },
  {
    orderId: "2419",
    date: "2020-10-28",
    status: "Shipped",
    total: 850.3,
    itemCount: 2,
  },
  {
    orderId: "2420",
    date: "2020-10-29",
    status: "Delivered",
    total: 450.0,
    itemCount: 1,
  },
];

const Order = () => {
  // Hàm định dạng ngày
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  // Hàm định dạng tiền tệ
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
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
                <td colSpan={4} className="text-center py-4 text-gray-500">
                  No orders found
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr
                  key={order.orderId}
                  className="border-t h-14 hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-8 text-sm text-[#222] underline">
                    #{order.orderId}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#222]">
                    {formatDate(order.date)}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#222]">
                    {order.status}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#222]">
                    {formatCurrency(order.total)} for {order.itemCount}{" "}
                    {order.itemCount > 1 ? "items" : "item"}
                  </td>
                  <td className="w-[153px]">
                    <button className="px-[45px] py-[10px] bg-[#222] text-white text-sm font-medium">
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
