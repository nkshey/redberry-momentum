import ChevronIcon from "../../ui/icons/ChevronIcon";

const filters = [
  {
    id: 1,
    name: "დეპარტამენტი",
  },
  {
    id: 2,
    name: "პრიორიტეტი",
  },
  {
    id: 3,
    name: "თანამშრომელი",
  },
];

function FilterPanel() {
  return (
    <div className="border-light-gray mb-20 grid w-fit grid-cols-[repeat(3,200px)] items-center gap-[2.8125rem] rounded-[0.625rem] border">
      {filters.map((filter) => (
        <button
          className="flex h-11 cursor-pointer items-center justify-center gap-2"
          key={filter.id}
        >
          {filter.name}
          <ChevronIcon />
        </button>
      ))}
    </div>
  );
}

export default FilterPanel;
