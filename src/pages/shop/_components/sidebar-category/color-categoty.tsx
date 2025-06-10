  // import React from 'react';
  // import {useState} from 'react'
  // import ButtonFilter from '@/components/commons/button-filter';


  // interface ColorCategoryProps {
  //   selectedColors: string[];
  //   onColorSelect: (color: string) => void;
  // }

  // const ColorCategory: React.FC<ColorCategoryProps> = ({ selectedColors, onColorSelect }) => {
  //   const [openCats, setOpenCats] = useState(true);

  //   const handleClick = () => {
  //     setOpenCats((o) => !o);
  //   };

  //   const colorSwatches = [
  //     { color: "#222", name: "Black" },
  //     { color: "#b49c73", name: "Camel" },
  //     { color: "#b36a6c", name: "Rose" },
  //     { color: "#b595b6", name: "Lilac" },
  //     { color: "#aeb7ba", name: "Silver" },
  //     { color: "#e5b375", name: "Mustard" },
  //     { color: "#d2ae85", name: "Beige" },
  //     { color: "#c3975e", name: "Caramel" }
  //   ];

  //   return (
  //     <div >
  //         <ButtonFilter title="Color" onClick={handleClick} openCats={openCats}/>
  //         {openCats && (
  //             <div className="flex flex-wrap gap-4 mb-10">
  //             {colorSwatches.map(({ color, name }) => (
  //               <button
  //                 key={color}
  //                 className={`w-6 h-6 rounded-full border-2 ${
  //                   selectedColors.includes(color) ? 'border-black' : 'border-transparent'
  //                 }`}
  //                 style={{ backgroundColor: color }}
  //                 onClick={() => onColorSelect(color)}
  //                 title={name}
  //               />
  //             ))}
  //           </div>
  //         )}
  //     </div>
  //   )
  // }

  // export default ColorCategory