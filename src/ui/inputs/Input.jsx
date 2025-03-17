function Input({
  className,
  type = "text",
  label,
  name,
  requirement,
  ...props
}) {
  return (
    <div className="flex flex-col">
      <label className="text-gray mb-1.5 leading-[1em]" htmlFor={name}>
        {label}
      </label>

      <input
        className={`h-11.5 rounded-[0.3125rem] border bg-white px-3.5 focus:outline-0 ${className}`}
        type={type}
        autoComplete="off"
        name={name}
        id={name}
        {...props}
      />

      {requirement}
    </div>
  );
}

export default Input;
