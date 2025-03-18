function GalleryIcon({ width = 24, height = 24 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        fill="#343A40"
        d="M9 10.75c-1.52 0-2.75-1.23-2.75-2.75S7.48 5.25 9 5.25 11.75 6.48 11.75 8 10.52 10.75 9 10.75m0-4a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5"
      ></path>
      <path
        fill="#343A40"
        d="M15 22.75H9c-5.43 0-7.75-2.32-7.75-7.75V9c0-5.43 2.32-7.75 7.75-7.75h4c.41 0 .75.34.75.75s-.34.75-.75.75H9C4.39 2.75 2.75 4.39 2.75 9v6c0 4.61 1.64 6.25 6.25 6.25h6c4.61 0 6.25-1.64 6.25-6.25v-5c0-.41.34-.75.75-.75s.75.34.75.75v5c0 5.43-2.32 7.75-7.75 7.75"
      ></path>
      <path
        fill="#343A40"
        d="M18 8.75c-.41 0-.75-.34-.75-.75V2c0-.3.18-.58.46-.69s.6-.05.82.16l2 2c.29.29.29.77 0 1.06s-.77.29-1.06 0l-.72-.72V8c0 .41-.34.75-.75.75"
      ></path>
      <path
        fill="#343A40"
        d="M16 4.75c-.19 0-.38-.07-.53-.22a.754.754 0 0 1 0-1.06l2-2c.29-.29.77-.29 1.06 0s.29.77 0 1.06l-2 2c-.15.15-.34.22-.53.22M2.67 19.7a.751.751 0 0 1-.42-1.37l4.93-3.31c1.08-.72 2.57-.64 3.55.19l.33.29c.5.43 1.35.43 1.84 0l4.16-3.57c1.06-.91 2.73-.91 3.8 0l1.63 1.4c.31.27.35.74.08 1.06-.27.31-.75.35-1.06.08l-1.63-1.4c-.5-.43-1.34-.43-1.84 0l-4.16 3.57c-1.06.91-2.73.91-3.8 0l-.33-.29c-.46-.39-1.22-.43-1.73-.08L3.1 19.58c-.14.08-.29.12-.43.12"
      ></path>
    </svg>
  );
}

export default GalleryIcon;
