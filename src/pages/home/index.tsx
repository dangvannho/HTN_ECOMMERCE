import PromoBanners from "./_components/section-promo-banners";
import TestimonialsCarousel from "./_components/section-testimonial/testimonial";

const Home = () => {
  return (
    <div className="bg-[#FAF9F8]">
      <section className="mx-auto px-[20px] lg:px-[255px]">
        <PromoBanners />
      </section>
      <TestimonialsCarousel />
    </div>
  );
};

export default Home;
