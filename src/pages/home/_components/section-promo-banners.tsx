import CardBanner from "@/components/commons/card-banner";

const PromoBanners = () => {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 md:grid-rows-[1fr_1fr_1fr_1fr_1fr] grid-rows-4 gap-[30px] my-[100px] md:h-[600px]">
      {/* Card 1 - New Arrivals - div1 */}
      <CardBanner
        link="/new-arrivals"
        className="md:row-[1/4] md:col-[1/2] h-[300px] md:h-auto"
        subheading="BASIC COLLECTION"
        title="New Arrivals"
      />

      {/* Card 2 - Everygirl Wears - div2 */}
      <CardBanner
        link="/everygirl-wears"
        className="md:row-[1/3] md:col-[2/3] h-[300px] md:h-auto"
        subheading="WANT AND NEED"
        title="The Everygirl Wears"
      />

      {/* Card 3 - Free Shipping - div3 */}
      <CardBanner
        link="/free-shipping"
        className="md:row-[4/6] md:col-[1/2] h-[300px] md:h-auto"
        subheading="SHOP CASUAL"
        title="Free Shipping"
      />

      {/* Card 4 - Running Shoes - div4 */}
      <CardBanner
        link="/running-shoes"
        className="md:row-[3/6] md:col-[2/3] h-[300px] md:h-auto"
        subheading="SALE OFF THIS WEEK"
        title="Running Shoes"
      />
    </div>
  );
};

export default PromoBanners;
