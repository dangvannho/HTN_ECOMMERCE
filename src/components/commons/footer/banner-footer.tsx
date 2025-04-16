const BannerFooter = () => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <img src="/logo.svg" alt="" />
      </div>
      <p className="text-[#222] text-sm font-normal mt-10">
        1418 River Drive, Suite 35 Cottonhall, CA 9422 United States
      </p>
      <p className="text-[#222] text-sm font-medium mt-8">sale@uqmo.com</p>
      <p className="text-[#222] text-sm font-medium mt-2"> +1 246-345-0695</p>
    </div>
  );
};

export default BannerFooter;
