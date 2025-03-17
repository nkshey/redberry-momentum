function CancelIcon({ width = 40, height = 40 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 40 40"
      className="fill-very-light-gray hover:fill-light-gray rounded-full transition-all"
    >
      <path d="M20 0C8.955 0 0 8.955 0 20s8.955 20 20 20 20-8.955 20-20S31.045 0 20 0m2.357 20 5.488 5.488a1.665 1.665 0 0 1 0 2.357 1.665 1.665 0 0 1-2.357 0L20 22.357l-5.488 5.488a1.665 1.665 0 0 1-2.357 0 1.665 1.665 0 0 1 0-2.357L17.643 20l-5.488-5.488a1.665 1.665 0 0 1 0-2.357 1.665 1.665 0 0 1 2.357 0L20 17.643l5.488-5.488a1.665 1.665 0 0 1 2.357 0 1.665 1.665 0 0 1 0 2.357z"></path>
    </svg>
  );
}

export default CancelIcon;
