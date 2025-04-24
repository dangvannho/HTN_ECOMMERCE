import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  current: number;
  pages: number;
  setPage: (p: number) => void;
}

const Pagination = ({ current, pages, setPage }: PaginationProps) => (
  <nav className="flex justify-between items-center gap-6  my-5 lg:my-10 select-none" aria-label="Pagination">
    <button
      className="text-black font-medium hover:text-gray-500 flex items-center gap-1 transition-colors"
      onClick={() => setPage(Math.max(1, current - 1))}
      disabled={current === 1}
    >
      <ChevronLeft size={18} />
      <span>PREV</span>
    </button>

    <div className="flex gap-6">
      {[...Array(pages)].map((_, i) => (
        <button
          key={i}
          className={`relative text-sm font-medium transition-colors ${
            current === i + 1
              ? "text-black"
              : "text-gray-500 hover:text-black"
          }`}
          onClick={() => setPage(i + 1)}
        >
          {i + 1}
          {current === i + 1 && (
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-black" />
          )}
        </button>
      ))}
    </div>

    <button
      className="text-black font-medium hover:text-gray-500 flex items-center gap-1 transition-colors"
      onClick={() => setPage(Math.min(pages, current + 1))}
      disabled={current === pages}
    >
      <span>NEXT</span>
      <ChevronRight size={18} />
    </button>
  </nav>
);

export default Pagination;