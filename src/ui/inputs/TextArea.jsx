function TextArea({
  className,
  label,
  name,
  requirement,
  disabled,
  value,
  onChange,
}) {
  return (
    <div className="flex flex-col">
      <label className="text-gray mb-1.5 leading-[1em]" htmlFor={name}>
        {label}
      </label>

      <textarea
        className={`resize-none border bg-white focus:outline-0 disabled:cursor-not-allowed ${className}`}
        autoComplete="off"
        id={name}
        name={name}
        disabled={disabled}
        value={value}
        onChange={onChange}
      />

      {requirement}
    </div>
  );
}

export default TextArea;
