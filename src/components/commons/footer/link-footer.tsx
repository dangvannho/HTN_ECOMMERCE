import { Link } from "react-router-dom";

interface LinkFooterProps {
  title: string;
  links: { name: string; href: string }[];
}
const LinkFooter = ({ title, links }: LinkFooterProps) => {
  return (
    <div className="flex flex-col ">
      <h3 className="text-lg font-medium">{title}</h3>
      <ul className="space-y-4 flex flex-col mt-6 md:mt-8 lg:mt-10">
        {links.map((link, index) => (
          <Link
            key={index}
            to={link.href}
            className="text-[#222] text-sm relative group w-max"
          >
            {link.name}
            <span className="absolute -bottom-[3px] left-0 w-0 h-[2px] bg-[#222] transition-all duration-300 group-hover:w-1/2"></span>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default LinkFooter;
