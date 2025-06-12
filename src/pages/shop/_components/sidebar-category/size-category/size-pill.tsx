// import React from "react";

// interface SizePillProps {
//     size: string;
//     active: boolean;
//     onClick: () => void;
// }

// const SizePill =({ size, active, onClick }: SizePillProps) => {

//   return (
//     <button
//       onClick={onClick}
//       className={`text-[#222] text-center text-sm not-italic font-normal leading-[30px] transition-all inline-flex h-[35px] px-[21px] py-px items-center gap-[10px] flex-shrink-0 border-[1px] border-solid border-[var(--Background-Footer,#E4E4E4)] ${
//         active
//           ? "bg-black text-white border-black"
//           : "bg-white text-accentBlack border-gray-300 hover:bg-gray-100"
//       }`}
//     >
//       {size}
//     </button>
//   );
// }
// export default SizePill