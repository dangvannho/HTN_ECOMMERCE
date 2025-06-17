import CardBanner from "@/components/commons/card-banner";
import useCollection from "@/services/collection/hooks/useCollection";

const PromoBanners = () => {
  const { collections, loading } = useCollection();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid md:grid-cols-2 grid-cols-1 md:grid-rows-[1fr_1fr_1fr_1fr_1fr] grid-rows-4 gap-[30px] my-[100px] md:h-[600px]">
      {collections.slice(0, 4).map((collection, index) => (
        <CardBanner
          key={collection._id}
          link={`/collections/${collection.slug}`}
          className={`${
            index === 0
              ? "md:row-[1/4] md:col-[1/2]"
              : index === 1
              ? "md:row-[1/3] md:col-[2/3]"
              : index === 2
              ? "md:row-[4/6] md:col-[1/2]"
              : "md:row-[3/6] md:col-[2/3]"
          } h-[300px] md:h-auto`}
          title={collection.name || collection.title}
          image={collection.images[0]}
        />
      ))}
    </div>
  );
};

export default PromoBanners;
