function Input({ label, requirement }) {
  return (
    <div className="flex flex-col">
      <label className="text-gray" htmlFor="">
        {label}
      </label>

      <input
        className="border-very-light-gray mb-1 h-11.5 rounded-[0.3125rem] border bg-white px-3.5"
        type="text"
      />

      {requirement}
    </div>
  );
}

export default Input;
