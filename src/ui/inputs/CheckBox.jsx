import useFilterStore, { FILTER_TYPES } from "../../stores/useFilterStore";
import CheckMarkIcon from "../icons/CheckMarkIcon";

function CheckBox({ filter, filterType, onChange }) {
  const temp = useFilterStore((state) => state.temp);

  // Check only the specific filter type
  let isChecked = false;

  if (filterType === FILTER_TYPES.DEPARTMENTS) {
    isChecked = temp.departments.some((item) => item.id === filter.id);
  } else if (filterType === FILTER_TYPES.PRIORITIES) {
    isChecked = temp.priorities.some((item) => item.id === filter.id);
  } else if (filterType === FILTER_TYPES.EMPLOYEE) {
    isChecked = temp.employee !== null && temp.employee.id === filter.id;
  }

  const isEmployee = filterType === FILTER_TYPES.EMPLOYEE;

  return (
    <label
      className="flex w-fit cursor-pointer items-center gap-3.5"
      htmlFor={filter.id}
    >
      <div className="relative grid">
        <input
          className="peer checked:border-purple relative size-5.5 cursor-pointer appearance-none rounded-md border-[2px] bg-white"
          type="checkbox"
          id={filter.id}
          checked={isChecked}
          onChange={onChange}
        />

        <CheckMarkIcon className="peer-checked:stroke-purple pointer-events-none absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 stroke-white peer-checked:block" />
      </div>

      {isEmployee ? (
        <div className="flex items-center gap-[0.625rem]">
          <img
            className="size-7 rounded-full object-cover"
            src={filter.avatar}
            alt={`${filter.name} ${filter.surname}`}
          />
          <span className={`${isChecked ? "text-purple" : ""}`}>
            {filter.name} {filter.surname}
          </span>
        </div>
      ) : (
        <span className={`leading-[1em] ${isChecked ? "text-purple" : ""}`}>
          {filter.name}
        </span>
      )}
    </label>
  );
}

export default CheckBox;
