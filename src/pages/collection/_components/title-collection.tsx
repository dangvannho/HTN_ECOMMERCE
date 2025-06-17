interface TitleCollectionProps {
  onScrollToSection: (section: string) => void;
}

const sections = [
  { id: "story", label: "Câu chuyện" },
  { id: "product", label: "Sản phẩm" },
];

const TitleCollection = ({ onScrollToSection }: TitleCollectionProps) => {
  return (
      <div className="flex justify-center gap-5 text-[#7f7f7f] text-[12px] md:text-[20px] pb-5">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => onScrollToSection(section.id)}
          className="uppercase underline-offset-4 hover:text-yellow-600 transition-colors duration-700 relative group w-max pb-1"
        >
          {section.label}
          <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#222] transition-all duration-700 group-hover:w-full"></span>
        </button>
      ))}
    </div>
  );
};

export default TitleCollection;
