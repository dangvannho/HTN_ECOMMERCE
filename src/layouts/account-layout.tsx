import Header from "@/components/commons/header";
import Footer from "@/components/commons/footer/footer";
import SidebarAccount from "@/components/commons/sidebar-account";
const AccountLayout = ({ children }: { children: React.ReactNode }) => {
  // Những trang được bọc layout này có phải là protected layout không
  // Nếu có hiện tại chưa đăng nhập vẫn vào đây đựợc
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 mt-[70px] lg:mt-[230px]">
        <div className="xl:max-w-5xl 2xl:max-w-7xl mx-auto flex lg:flex-row flex-col gap-x-[240px] gap-y-[30px] relative mb-[100px] lg:px-0 px-4">
          <SidebarAccount />
          <div className="flex-1">{children}</div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AccountLayout;
