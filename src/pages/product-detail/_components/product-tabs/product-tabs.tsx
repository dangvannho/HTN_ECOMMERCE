import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdditionalInfoTab from "./additional-info-tab";
import DescriptionTab from "./description-tab";
import type { Product } from "@/services/product/types/product.type";

interface ProductTabsProps {
  productData: Product | null;
}

const ProductTabs = ({ productData }: ProductTabsProps) => {
  return (
    <div className="mt-14 lg:mt-24">
      <Tabs defaultValue="MÔ TẢ" className="w-full">
        <TabsList className="flex space-x-8 justify-center bg-transparent border-b-0">
          {["MÔ TẢ", "THÔNG TIN BỔ SUNG"].map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className="text-sm md:text-base font-medium text-[#767676] data-[state=active]:text-[#222] data-[state=active]:border-b-2 data-[state=active]:border-[#222] data-[state=active]:duration-100"
            >
              {tab.toUpperCase()}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="MÔ TẢ" className="mt-8 md:mt-[50px]">
          <DescriptionTab description={productData?.description} />
        </TabsContent>
        <TabsContent
          value="THÔNG TIN BỔ SUNG"
          className="mt-8 md:mt-[50px]"
        >
          <AdditionalInfoTab aditionalInfo={productData?.additional_info} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductTabs;
