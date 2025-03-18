function CircularPlusIcon({ width = 18, height = 18 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 18 18"
    >
      <rect
        width="16.5"
        height="16.5"
        x="0.75"
        y="0.75"
        stroke="#8338EC"
        strokeWidth="1.5"
        rx="8.25"
      ></rect>
      <path
        fill="#8338EC"
        d="M9.576 8.456h3.6v1.2h-3.6v3.648h-1.32V9.656h-3.6v-1.2h3.6V4.808h1.32z"
      ></path>
    </svg>
  );
}

export default CircularPlusIcon;
