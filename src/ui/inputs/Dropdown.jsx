import { useRef, useState, useEffect } from "react";
import ChevronIcon from "../../ui/icons/ChevronIcon";
import { useClickOutside } from "../../hooks/useClickOutside";

const Dropdown = ({ className, label, data, value, onChange, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const dropdownRef = useRef(null);

  useClickOutside(dropdownRef, () => {
    if (isOpen) setIsOpen(false);
  });

  useEffect(() => {
    setSelectedItem(data?.find((item) => item.id === value));
  }, [data, value]);

  function handleItemClick(item) {
    setSelectedItem(item);
    onChange(item.id);
    setIsOpen(false);
  }

  return (
    <div className="dropdown-container flex flex-col" ref={dropdownRef}>
      <label className="text-gray mb-1.5 leading-[1em]">{label}</label>

      {/* Store the value */}
      <input type="hidden" value={selectedItem?.id || ""} readOnly {...props} />

      {/* Dropdown button */}
      <button
        type="button"
        className={`relative flex h-11.5 cursor-pointer items-center justify-between rounded-md border bg-white px-3.5 ${className} ${isOpen ? "border-purple rounded-b-none" : "border-very-light-gray"}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Show selected item or placeholder */}
        <div className="text-sm font-light">
          {selectedItem ? (
            <div
              className={`flex items-center ${selectedItem.avatar ? "gap-2.5" : "gap-1.5"}`}
            >
              {selectedItem.icon && (
                <img src={selectedItem.icon} alt="priority" />
              )}
              {selectedItem.avatar && (
                <img
                  className="size-7.5 rounded-full object-cover"
                  src={selectedItem.avatar}
                  alt={selectedItem.name}
                />
              )}
              <span>{selectedItem.name}</span>
            </div>
          ) : (
            "აირჩიე"
          )}
        </div>

        {/* Dropdown arrow */}
        <ChevronIcon
          className={isOpen ? "-rotate-180" : ""}
          width={14}
          height={14}
        />

        {/* Dropdown items list */}
        {isOpen && data && (
          <ul className="border-purple absolute top-full -left-[1px] z-99 w-[calc(100%+2px)] rounded-b-[0.3125rem] border border-t-0 bg-white text-sm font-light">
            {data.map((item) => (
              <li
                key={item.id}
                className="hover:text-light-purple active:text-purple flex h-11.5 items-center gap-1.5 px-3.5 transition-colors"
                onClick={() => handleItemClick(item)}
              >
                {item.icon && <img src={item.icon} alt={item.name} />}
                {item.avatar && (
                  <img
                    className="size-7 rounded-full object-cover"
                    src={item.avatar}
                    alt={item.name}
                  />
                )}
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        )}
      </button>
    </div>
  );
};

export default Dropdown;
