import { useState } from "react";
import FloatingInput from "@/components/commons/float-input";
const ReviewForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [review, setReview] = useState("");

  return (
    <div className="mt-[50px]">
      <h3 className="text-lg font-medium text-[#222]">
        Be the first to review "Message Cotton T-Shirt"
      </h3>
      <p className="text-sm text-[#222] mt-1">
        Your email address will not be published. Required fields are marked{" "}
        <span className="text-red-500">*</span>
      </p>

      {/* Đánh giá sao */}
      <div className="mt-[30px] flex">
        <p className="text-sm font-medium text-[#222]">Your rating *</p>
      </div>

      {/* Form nhập liệu */}
      <form className="mt-4">
        <div>
          <textarea
            className="mt-1 w-full h-[200px] border-2 border-gray-300 p-2 text-sm text-[#222] focus:outline-none focus:border-[#222] resize-none"
            placeholder="Your Review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </div>
        <div className="my-[30px]">
          <FloatingInput
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <FloatingInput
          label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="flex items-center gap-2 mt-[27px]">
          <input type="checkbox" className="w-4 h-4" />
          <label className="text-sm text-[#767676]">
            Save my name, email, and website in this browser for the next time I
            comment.
          </label>
        </div>

        <button className="bg-[#222] text-white px-14 py-4 text-sm uppercase mt-[27px]">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
