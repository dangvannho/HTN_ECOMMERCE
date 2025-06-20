import Header from "@/components/commons/header";
import Footer from "@/components/commons/footer/footer";
import OAuthHandler from "@/pages/auth/_components/o-auth-handler"; 


const MainLayout = ({ children }: { children: React.ReactNode }) => { 
  return (
    <div className="flex min-h-screen flex-col">
      <OAuthHandler />
      <Header />
      <main className="flex-1 mt-[60px] lg:mt-[96px] xl:max-w-5xl 2xl:max-w-7xl mx-auto py-[33px] items-center px-4 xl:px-0">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
