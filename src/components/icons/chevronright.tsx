const ChevronRight = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="7"
      height="11"
      viewBox="0 0 7 11"
      fill="none"
      className={className}
    >
      <path
        d="M6.83968 5.89234C7.05344 5.67859 7.05344 5.32146 6.83968 5.10715L1.90756 0.162373C1.69106 -0.0541244 1.33996 -0.0541243 1.12401 0.162373C0.907511 0.378871 0.907511 0.73052 1.12401 0.947018L5.66434 5.5L1.12346 10.0524C0.906963 10.2695 0.906963 10.6206 1.12346 10.8376C1.33996 11.0541 1.69106 11.0541 1.90701 10.8376L6.83968 5.89234Z"
        fill="black"
      />
    </svg>
  );
};

export default ChevronRight;
