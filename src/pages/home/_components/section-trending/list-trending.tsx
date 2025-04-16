import ItemTrending from "@/pages/home/_components/section-trending/item-trending";
import { productData } from "../../../../data/data";

const ListTrending = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
      {productData.map((product) => (
        <ItemTrending key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ListTrending;
