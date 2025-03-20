import CloseIcon from "../../ui/icons/CloseIcon";

function FilterTag({ id, name, onClick }) {
  return (
    <li key={id}>
      <button
        className="text-gray flex w-max cursor-pointer items-center gap-1 rounded-full border border-[#CED4DA] px-2.5 py-1.5 text-sm leading-[1em] font-light"
        onClick={onClick}
      >
        <span>{name}</span>
        <CloseIcon />
      </button>
    </li>
  );
}

export default FilterTag;
