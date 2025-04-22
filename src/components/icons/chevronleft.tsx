const ChevronLeft = ({ className }: { className?: string }) => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        className={className}
      >
        <g clip-path="url(#clip0_37_606)">
          <path
            d="M3.58984 6.96456L10.3353 0.221369C10.6313 -0.0738688 11.1108 -0.0738688 11.4075 0.221369C11.7035 0.516606 11.7035 0.99615 11.4075 1.29139L5.19714 7.49954L11.4068 13.7077C11.7028 14.0029 11.7028 14.4825 11.4068 14.7784C11.1108 15.0737 10.6305 15.0737 10.3345 14.7784L3.58909 8.03532C3.29765 7.74314 3.29765 7.25606 3.58984 6.96456Z"
            fill="#767676"
          />
        </g>
        <defs>
          <clipPath id="clip0_37_606">
            <rect
              width="15"
              height="15"
              fill="white"
              transform="matrix(1 0 0 -1 0 15)"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default ChevronLeft;
