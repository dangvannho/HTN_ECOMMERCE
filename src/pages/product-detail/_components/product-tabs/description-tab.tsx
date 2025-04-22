const DescriptionTab = () => {
  return (
    <div className="max-w-6xl mx-auto lg:px-0 px-3">
      <h4 className="text-[16px] font-medium">
        Sed do eiusmod tempor incididunt ut labore
      </h4>
      <p className="text-[#222] font-normal mt-6">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus
        error sit voluptatem accusantium doloremque laudantium, totam rem
        aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
        beatae vitae dicta sunt explicabo.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
        <div>
          <h4 className="text-[16px] font-medium">Why Choose Product?</h4>
          <ul className="list-disc pl-5 space-y-2 mt-6 text-[#222] font-normal text-sm">
            <li>Creat by cotton fabric with soft and smooth</li>
            <li>Simple, Configurable (e.g. size, color, etc.), bundled</li>
            <li>Downloadable/Digital Products, Virtual Products</li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium">Sample Number List</h4>
          <ol className="list-decimal pl-5 space-y-2 mt-6 text-[#222] text-sm">
            <li>Create Store-specific attributes on the fly</li>
            <li>Simple, Configurable (e.g. size, color, etc.), bundled</li>
            <li>Downloadable/Digital Products, Virtual Products</li>
          </ol>
        </div>
      </div>
      <div className="mt-[37px]">
        <h4 className="font-medium text-[16px]">Lining</h4>
        <p className="text-[#222] text-sm mt-3">
          100% Polyester, Main: 100% Polyester.
        </p>
      </div>
    </div>
  );
};

export default DescriptionTab;
