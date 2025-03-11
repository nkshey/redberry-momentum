function SecondaryButton({ className, children }) {
  return (
    <button
      className={`border-purple hover:border-light-purple flex cursor-pointer items-center gap-1 rounded-[0.3125rem] border bg-white px-5 py-2.5 leading-[1em] transition-colors ${className}`}
    >
      {children}
    </button>
  );
}

export default SecondaryButton;
