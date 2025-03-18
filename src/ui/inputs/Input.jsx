function Input({
  parentClassName,
  className,
  type = "text",
  min,
  label,
  name,
  requirement,
  disabled,
  value,
  onChange,
}) {
  return (
    <div className={`flex flex-col ${parentClassName}`}>
      <label className="text-gray mb-1.5 leading-[1em]" htmlFor={name}>
        {label}
      </label>

      <input
        className={`h-11.5 rounded-md border bg-white px-3.5 focus:outline-0 disabled:cursor-not-allowed ${className}`}
        autoComplete="off"
        type={type}
        min={min}
        disabled={disabled}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
      />

      {requirement}
    </div>
  );
}

export default Input;
