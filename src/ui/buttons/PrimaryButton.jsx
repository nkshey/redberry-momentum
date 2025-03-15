function PrimaryButton({ className, children, disabled, onClick }) {
  return (
    <button
      className={`hover:bg-light-purple flex items-center gap-1 rounded-[0.3125rem] px-5 text-white transition-colors ${disabled ? "bg-light-purple cursor-default" : "bg-purple cursor-pointer"} ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default PrimaryButton;
