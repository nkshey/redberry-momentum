function CheckmarkIcon({ width = 14, height = 10, className }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 14 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`stroke-[#212529] ${className}`}
    >
      <path
        d="M12.3334 1.33325L5.00008 8.66659L1.66675 5.33325"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default CheckmarkIcon;
