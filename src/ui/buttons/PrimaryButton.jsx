function PrimaryButton({
  className,
  type = "button",
  children,
  disabled,
  onClick,
}) {
  return (
    <button
      className={`hover:bg-light-purple flex items-center gap-1 rounded-md px-5 text-white transition-colors ${disabled ? "bg-light-purple cursor-not-allowed" : "bg-purple cursor-pointer"} ${className}`}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default PrimaryButton;
