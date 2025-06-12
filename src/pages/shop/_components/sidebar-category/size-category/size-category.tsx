// import React, { useState } from 'react';
// import { ChevronDown } from "lucide-react";
// import ButtonFilter from '@/components/commons/button-filter';

// interface SizeCategoryProps {
//   selectedSizes: string[];
//   onSizeSelect: (size: string) => void;
// }

// const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

// const SizeCategory: React.FC<SizeCategoryProps> = ({ selectedSizes, onSizeSelect }) => {
//   const [openCats, setOpenCats] = useState(true);
//   const handleClick = () => {
//     setOpenCats((o) => !o);
//   };

//   return (
//     <div>
//       <ButtonFilter title="Sizes" onClick={() => setOpenCats((o) => !o)} openCats={openCats}/>
//       {openCats && (
//         <div className="flex flex-wrap gap-2 mb-10">
//           {sizes.map((size) => (
//             <button
//               key={size}
//               onClick={() => onSizeSelect(size)}
//               className={`w-10 h-10 flex items-center justify-center border-[1px] border-solid border-[var(--Background-Footer,#E4E4E4)] text-sm text-[#222] text-center not-italic font-normal leading-[30px]
//                 ${selectedSizes.includes(size) 
//                   ? 'bg-black text-white border-black' 
//                   : 'border-gray-300 hover:border-black'
//                 }`}
//             >
//               {size}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SizeCategory;