import Header from "@/components/commons/header";
import Footer from "@/components/commons/footer/footer";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 mt-[60px] lg:mt-[96px] items-center ">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
