function SecondaryButton({ className, children, disabled, onClick }) {
  return (
    <button
      className={`border-purple hover:border-light-purple flex h-10 cursor-pointer items-center gap-1 rounded-[0.3125rem] border bg-white px-5 leading-[1em] transition-colors ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default SecondaryButton;
