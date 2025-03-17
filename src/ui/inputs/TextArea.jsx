function TextArea({ className, label, name, requirement, ...props }) {
  return (
    <div className="flex flex-col">
      <label className="text-gray mb-1.5 leading-[1em]" htmlFor={name}>
        {label}
      </label>

      <textarea
        className={`resize-none border bg-white focus:outline-0 ${className}`}
        autoComplete="off"
        id={name}
        name={name}
        {...props}
      />

      {requirement}
    </div>
  );
}

export default TextArea;
