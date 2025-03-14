import ChevronIcon from "../../ui/icons/ChevronIcon";

function FilterOptionButton({ ref, name, isOpen, onClick }) {
  return (
    <button
      className={`group flex h-11 cursor-pointer items-center gap-2 transition-colors ${isOpen ? "text-purple" : "hover:text-light-purple active:text-purple"}`}
      ref={ref}
      onClick={onClick}
    >
      <span>{name}</span>

      <ChevronIcon
        className={
          isOpen
            ? "fill-purple -rotate-180"
            : "group-hover:fill-light-purple group-active:fill-purple"
        }
      />
    </button>
  );
}

export default FilterOptionButton;
