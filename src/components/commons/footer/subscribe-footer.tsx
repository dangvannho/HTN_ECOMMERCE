const SubscribeFooter = () => {
  return (
    <div className="flex flex-col">
      <h3 className="text-lg font-medium">SUBSCRIBE</h3>
      <p className="text-[#222] text-sm mt-10">
        Be the first to get the latest news about trends, promotions, and much
        more!
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
      <h4 className="text-sm font-medium mt-8">Secure payments</h4>
      <img src="/payments_logo.svg" alt="" className="mt-4" />
    </div>
  );
};

export default SubscribeFooter;
