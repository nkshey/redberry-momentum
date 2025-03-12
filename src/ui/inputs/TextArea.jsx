function TextArea({ label, requirement }) {
  return (
    <div className="flex flex-col">
      <label className="text-gray" htmlFor="">
        {label}
      </label>

      <textarea className="border-very-light-gray mb-1 h-33.5 resize-none rounded-[0.3125rem] border bg-white p-3.5" />

      {requirement}
    </div>
  );
}

export default TextArea;
