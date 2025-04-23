const Menu = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="18"
      viewBox="0 0 25 18"
      fill="none"
      className={className}
    >
      <rect width="25" height="2" fill="#222222" />
      <rect y="8" width="20" height="2" fill="#222222" />
      <rect y="16" width="25" height="2" fill="#222222" />
    </svg>
  );
};

export default Menu;
