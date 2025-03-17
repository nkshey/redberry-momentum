function TrashIcon({ className, width = 14, height = 14 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 14 14"
      className={className}
    >
      <path
        stroke="#6C757D"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M1.75 3.5h10.5M11.084 3.5v8.166a1.167 1.167 0 0 1-1.167 1.167H4.084a1.167 1.167 0 0 1-1.167-1.167V3.5m1.75 0V2.333a1.167 1.167 0 0 1 1.167-1.166h2.333a1.167 1.167 0 0 1 1.167 1.166V3.5M5.833 6.417v3.5M8.167 6.417v3.5"
      ></path>
    </svg>
  );
}

export default TrashIcon;
