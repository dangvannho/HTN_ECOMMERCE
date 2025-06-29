const SubscribeFooter = () => {
  return (
    <div className="flex flex-col">
      <h3 className="text-lg font-medium">ĐẶT MUA NGAY</h3>
      <p className="text-[#222] text-sm mt-6 md:mt-8 lg:mt-10">
        Hãy là người đầu tiên nhận được tin tức mới nhất về xu hướng, chương trình khuyến mãi và nhiều hơn thế nữa!
      </p>
      {/* <div className="flex mt-3">
        <input
          type="email"
          placeholder="Your email address"
          className=" bg-white text-[#222] px-2 py-3 w-2/3 text-sm focus:outline-none flex-1 placeholder:text-[#222]"
        />
        <button className="bg-white text-[#222] px-3 text-sm font-medium">
          JOIN
        </button>
      </div> */}
      <h4 className="text-sm font-medium mt-8">Phương thức thanh toán</h4>
      <img src="/payments_logo.svg" alt="" className="mt-4" />
    </div>
  );
};

export default SubscribeFooter;
