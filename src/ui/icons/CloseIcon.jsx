function CloseIcon({ width = 14, height = 14 }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.5 4L3.5 11"
        stroke="#343A40"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.5 4L10.5 11"
        stroke="#343A40"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default CloseIcon;
