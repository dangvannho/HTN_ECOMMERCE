import { useNavigate } from "react-router-dom";
import routePath from "@/config/route";
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center py-[100px]">
      <h4 className="text-[100px] font-bold">OOPS!</h4>
      <p className="text-[26px]">Không tìm thấy trang.</p>
      <p className="w-[476px] text-sm text-center mt-2">
        Xin lỗi, chúng tôi không tìm thấy trang bạn đang tìm kiếm. Chúng tôi đề nghị
        bạn quay lại trang chủ.
      </p>
      <button
        className="bg-black text-white px-6 py-4 w-[340px] text-sm mt-6"
        onClick={() => navigate(routePath.home)}
      >
        GO BACK
      </button>
    </div>
  );
};

export default NotFound;
