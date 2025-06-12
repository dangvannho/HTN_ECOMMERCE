import Header from "@/components/commons/header";
import Footer from "@/components/commons/footer/footer";
import OAuthHandler from "@/pages/auth/_components/o-auth-handler"; 


const MainLayout = ({ children }: { children: React.ReactNode }) => { 
  return (
    <div className="flex min-h-screen flex-col">
      <OAuthHandler />
      <Header />
      <main className="flex-1 mt-[60px] lg:mt-[96px]">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
