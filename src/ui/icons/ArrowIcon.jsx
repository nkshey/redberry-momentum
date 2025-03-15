function ArrowIcon({ width = 16, height = 16 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 16 16"
    >
      <g fill="#8338EC" clipPath="url(#clip0_6843_1684)">
        <path d="M16 14h-1.333v-2c0-3.334-2.666-6-6-6H5.334V4.665h3.333a7.31 7.31 0 0 1 7.334 7.333zM2 5.333l3.333 3.334V2z"></path>
      </g>
      <defs>
        <clipPath id="clip0_6843_1684">
          <path fill="#fff" d="M0 0h16v16H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
}

export default ArrowIcon;
