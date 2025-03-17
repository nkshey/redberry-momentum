function SecondaryButton({ className, children, disabled, onClick }) {
  return (
    <button
      className={`border-purple rounded-mdborder flex h-10 items-center gap-1 bg-white px-5 leading-[1em] transition-colors ${disabled ? "cursor-not-allowed opacity-50" : "hover:border-light-purple cursor-pointer"} ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default SecondaryButton;
