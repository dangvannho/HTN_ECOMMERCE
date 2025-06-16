import { useNavigate } from "react-router-dom";
import routePath from "@/config/route";
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center py-[100px]">
      <h4 className="text-[100px] font-bold">OOPS!</h4>
      <p className="text-[26px]">Page not found.</p>
      <p className="w-[476px] text-sm text-center mt-2">
        Sorry, we couldn't find the page you where looking for. We suggest that
        you return to home page.
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
