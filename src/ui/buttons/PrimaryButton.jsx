function PrimaryButton({ className, children, onClick }) {
  return (
    <button
      className={`bg-purple hover:bg-light-purple flex cursor-pointer items-center gap-1 rounded-[0.3125rem] px-5 py-2.5 text-white transition-colors ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default PrimaryButton;
