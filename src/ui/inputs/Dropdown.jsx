import { useState } from "react";
import ChevronIcon from "../../ui/icons/ChevronIcon";

function Dropdown({
  className,
  label,
  data,
  isLoading,
  selected,
  handleSelect,
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <label htmlFor="">{label}</label>

      <button
        className={`relative flex h-11.5 cursor-pointer items-center justify-between rounded-[0.3125rem] border bg-white px-3.5 ${className} ${isOpen ? "border-purple rounded-b-none" : "border-very-light-gray"}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-sm font-light">{selected}</span>
        <ChevronIcon
          className={isOpen ? "-rotate-180" : ""}
          width={14}
          height={14}
        />

        {data && isOpen && (
          <ul className="border-purple absolute top-full -left-[1px] z-99 w-[calc(100%+2px)] rounded-b-[0.3125rem] border border-t-0 bg-white text-sm font-light">
            {data.map((item, index) => (
              <li
                className="hover:text-light-purple active:text-purple flex h-11.5 items-center px-3.5 transition-colors"
                key={item.id ?? index}
                onClick={() => handleSelect(item)}
              >
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </button>
    </div>
  );
}

export default Dropdown;
