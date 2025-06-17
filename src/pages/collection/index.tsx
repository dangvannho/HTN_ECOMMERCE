import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collectionApi } from "@/services/collection/api/collection.api";
import { Collection } from "@/services/collection/types/collection.types";
import { Product } from "@/services/product/types/product.type";
import Loading from "@/components/commons/loading";
import TitleCollection from "./_components/title-collection";
import CollectionHeader from "./_components/collection-header";
import CardItem from "@/components/commons/card-item";
import { ChevronRight } from "lucide-react";


const CollectionPage = () => {
  const { slug } = useParams();
  const [collection, setCollection] = useState<Collection | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCollectionData = async () => {
      try {
        if (!slug) return;
        const [collectionResponse, productsResponse] = await Promise.all([
          collectionApi.getCollectionBySlug(slug),
          collectionApi.getProductsByCollectionSlug(slug),
        ]);
        setCollection(collectionResponse.data);
        setProducts(productsResponse.data);
      } catch (err) {
        setError("Failed to fetch collection data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCollectionData();
  }, [slug]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (loading) return <Loading />;
  if (error) return <div>{error}</div>;
  if (!collection) return <div>Collection not found</div>;

  return (
    <>
      <div className="bg-[#f9f9f9]">
        <div className=" flex items-center gap-2 uppercase xl:max-w-5xl 2xl:max-w-7xl mx-auto py-3 mb-5">
          <a className="font-medium" href="/">
            home
          </a>
          <ChevronRight size={18} className=" text-gray-400" />
          <p className="text-gray-400">{collection.name}</p>
        </div>
      </div>

      <div className="xl:max-w-5xl 2xl:max-w-7xl mx-auto">
        <CollectionHeader title={collection.name} />

        <TitleCollection onScrollToSection={scrollToSection} />

        <div className="flex items-center justify-center mt-14 mb-4">
          <img src="/logo.svg" alt="logo" />
        </div>

        <CollectionHeader title="Câu chuyện" id="story" />

        <div
          dangerouslySetInnerHTML={{ __html: collection.description || "" }}
        />

        <div className="flex items-center justify-center mt-14 mb-4">
          <img src="/logo.svg" alt="logo" />
        </div>

        <CollectionHeader title="Sản phẩm" id="product" />

        {/* Display products */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <CardItem key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-8">
            Không có sản phẩm nào trong bộ sưu tập này
          </div>
        )}
      </div>
    </>
  );
};

export default CollectionPage;
