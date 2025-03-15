function TextArea({
  className,
  label,
  placeholder,
  requirement,
  name,
  value,
  onChange,
}) {
  return (
    <div className="flex flex-col">
      <label className="text-gray" htmlFor={name}>
        {label}
      </label>

      <textarea
        className={`border-very-light-gray resize-none border bg-white ${className}`}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />

      {requirement}
    </div>
  );
}

export default TextArea;
