import Header from "@/components/commons/header";
import Footer from "@/components/commons/footer/footer";
import SidebarAccount from "@/components/commons/sidebar-account";
import PrivateRoute from "@/routes/private-route";
const AccountLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <PrivateRoute>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 mt-[70px] lg:mt-[230px]">
          <div className="xl:max-w-5xl 2xl:max-w-7xl mx-auto flex lg:flex-row flex-col gap-x-[240px] gap-y-[30px] relative mb-[100px] xl:px-0 px-4">
            <SidebarAccount />
            <div className="flex-1">{children}</div>
          </div>
        </main>

        <Footer />
      </div>
    </PrivateRoute>
  );
};

export default AccountLayout;
