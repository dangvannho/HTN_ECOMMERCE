import { Link } from "react-router-dom";

const PromoBanners = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[23px] gap-y-[30px] my-[100px]">
      {/* Card 1 */}
      <Link
        to="/new-arrivals"
        className="bg-cover bg-center p-6 text-white h-[250px] md:h-full flex flex-col justify-end md:col-start-1 md:row-start-1 md:row-end-6"
        style={{
          backgroundImage:
            "url('https://www.topsandbottomsusa.com/cdn/shop/articles/Men_s_Dunk_Low_Retro_SE_Sketch_Exploration_Banner-436321.webp?v=1739831185&width=2048')",
        }}
      >
        <div className="text-gray-500 transition-all duration-300 hover:text-yellow-400">
          <p className="text-sm font-medium tracking-wider uppercase mb-1">
            BASIC COLLECTION
          </p>
          <h2 className="text-2xl font-semibold mb-2">New Arrivals</h2>
          <p className="text-sm font-medium underline underline-offset-4 hover:text-yellow-300 transition-colors duration-300">
            SHOP NOW
          </p>
        </div>
      </Link>

      {/* Card 2 */}
      <Link
        to="/free-shipping"
        className="bg-cover bg-center p-6 text-white h-[250px] md:h-full flex flex-col justify-end md:col-start-1 md:row-start-6 md:row-end-9"
        style={{
          backgroundImage:
            "url('https://footwearnews.com/wp-content/uploads/2022/01/nike-logo-worth.jpg?w=350')",
        }}
      >
        <div className="text-white transition-all duration-300 hover:text-yellow-400">
          <p className="text-sm font-medium tracking-wider uppercase mb-1">
            SHOP CASUAL
          </p>
          <h2 className="text-2xl font-semibold mb-2">Free Shipping</h2>
          <p className="text-sm font-medium underline underline-offset-4 hover:text-yellow-300 transition-colors duration-300">
            SHOP NOW
          </p>
        </div>
      </Link>

      {/* Card 3 */}
      <Link
        to="/everygirl-wears"
        className="bg-cover bg-center p-6 text-white h-[250px] md:h-full flex flex-col justify-end md:col-start-2 md:row-start-1 md:row-end-4"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/736x/70/bb/9d/70bb9d76f0f38c5cc3e0e9fc384f8fef.jpg')",
        }}
      >
        <div className="text-gray-500 transition-all duration-300 hover:text-yellow-400">
          <p className="text-sm font-medium tracking-wider uppercase mb-1">
            WANT AND NEED
          </p>
          <h2 className="text-2xl font-semibold mb-2">The Everygirl Wears</h2>
          <p className="text-sm font-medium underline underline-offset-4 hover:text-yellow-300 transition-colors duration-300">
            SHOP NOW
          </p>
        </div>
      </Link>

      {/* Card 4 */}
      <Link
        to="/running-shoes"
        className="bg-cover bg-center p-6 text-white h-[250px] md:h-full flex flex-col justify-end md:col-start-2 md:row-start-4 md:row-end-9"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/736x/fa/45/96/fa4596ad9a9d39901eeb455ed4f74e44.jpg')",
        }}
      >
        <div className="text-white transition-all duration-300 hover:text-yellow-400">
          <p className="text-sm font-medium tracking-wider uppercase mb-1">
            SALE OFF THIS WEEK
          </p>
          <h2 className="text-2xl font-semibold mb-2">Running Shoes</h2>
          <p className="text-sm font-medium underline underline-offset-4 hover:text-yellow-300 transition-colors duration-300">
            SHOP NOW
          </p>
        </div>
      </Link>
    </div>
  );
};

export default PromoBanners;
