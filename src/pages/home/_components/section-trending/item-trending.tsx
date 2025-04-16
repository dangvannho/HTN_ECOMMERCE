
interface Product {
  id: number;
  image: string;
  category: string;
  name: string;
  price: number;
  discount?: number;
  tag?: string;
  tagColor?: string;
  colors?: string[];
}

interface ItemTrendingProps {
  product: Product;
}

const ItemTrending = ({ product }: ItemTrendingProps) => {
  return (
    <div className="w-[343px] h-[515px] cursor-pointer">
      <div className="relative bg-[#F3F3F3] aspect-[1/1]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300"
        />
        {product.tag && (
          <div className={`absolute top-3 right-3 ${product.tagColor} px-2 py-1 text-sm font-medium`}>
            {product.tag}
          </div>
        )}
      </div>

      <div className="my-3">
        <p className="text-sm not-italic font-normal text-[#767676]">{product.category}</p>
        <h3 className="text-base not-italic font-normal text-gray-900">{product.name}</h3>
        <div className="flex items-center gap-2">
          {product.discount ? (
            <>
              <span className="text-base font-medium">${product.discount}</span>
              <span className="text-sm text-red-500 line-through">${product.price}</span>
            </>
          ) : (
            <span className="text-base font-medium">${product.price}</span>
          )}
        </div>

        {product.colors && product.colors.length > 0 && (
          <div className="flex gap-2 mt-3">
            {product.colors.map((color, index) => (
              <button
                key={index}
                className={`w-4 h-4 rounded-full border ${color === 'black'
                  ? 'bg-black border-black'
                  : color === 'white'
                    ? 'bg-white border-gray-300'
                    : `bg-${color}-500 border-${color}-500`
                  } hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500`}
                aria-label={`Select ${color} color`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemTrending;
