import React from "react";

const Addresses = () => {
  return (
    <>
      <h4 className=" text-[30px] lg:text-[35px] font-bold uppercase absolute lg:left-0 left-3 top-0 lg:-top-[90px]">
        Addreses
      </h4>

      <div>
        <p className="text-[#222] text-sm not-italic font-normal leading-[24px]">
          The following addresses will be used on the checkout page by default.
        </p>
        <div className="block lg:flex gap-[92px]">
          <div className="flex-1">
            <div className="flex justify-between mt-[62px]">
              <h5>BILLING ADDRESS</h5>
              <a href="#" className="underline">Edit</a>
            </div>
            <div className="text-[#222] text-sm not-italic font-normal leading-[24px]">
              <div className="mt-[15px]">
                <p>Daniel Robinson</p>
                <p>1418 River Drive, Suite 35 Cottonhall, CA 9622</p>
                <p>United States</p>
              </div>

              <div className="mt-[20px]">
                <p>sale@uomo.com</p>
                <p>+1 246-345-0695</p>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex justify-between mt-[62px]">
              <h5>SHIPPING ADDRESS</h5>
              <a href="#" className="underline">Edit</a>
            </div>
            <div className="text-[#222] text-sm not-italic font-normal leading-[24px]">
              <div className="mt-[15px]">
                <p>Daniel Robinson</p>
                <p>1418 River Drive, Suite 35 Cottonhall, CA 9622</p>
                <p>United States</p>
              </div>

              <div className="mt-[20px]">
                <p>sale@uomo.com</p>
                <p>+1 246-345-0695</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Addresses;
