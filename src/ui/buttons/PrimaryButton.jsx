function PrimaryButton({ className, children }) {
  return (
    <button
      className={`bg-purple hover:bg-light-purple flex cursor-pointer items-center gap-1 rounded-[0.3125rem] px-5 py-2.5 text-white transition-colors ${className}`}
    >
      {children}
    </button>
  );
}

export default PrimaryButton;
