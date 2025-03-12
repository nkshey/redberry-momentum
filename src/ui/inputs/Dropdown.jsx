import ChevronIcon from "../../ui/icons/ChevronIcon";

function Dropdown({ label }) {
  return (
    <div>
      <label htmlFor="">{label}</label>

      <div className="border-very-light-gray flex h-11.5 cursor-pointer items-center justify-between rounded-[0.3125rem] border bg-white px-3.5">
        <span className="text-sm font-light">დასაწყები</span>
        <ChevronIcon width={14} height={14} />
      </div>
    </div>
  );
}

export default Dropdown;
