import { Link } from "react-router-dom";
interface LinkFooterProps {
  title: string;
  links: string[];
}
const LinkFooter = ({ title, links }: LinkFooterProps) => {
  return (
    <div className="flex flex-col items-center md:items-start">
      <h3 className="text-lg font-medium">{title}</h3>
      <ul className="space-y-4 flex flex-col items-center md:items-start mt-10 ">
        {links.map((link, index) => (
          <Link
            key={index}
            to=""
            className="text-[#222] text-sm relative group w-max"
          >
            {link}
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#222] transition-all duration-300 group-hover:w-full"></span>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default LinkFooter;
