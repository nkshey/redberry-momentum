import CheckMarkIcon from "../ui/icons/CheckMarkIcon";

function CheckBox({ id, children }) {
  return (
    <label
      className="flex w-fit cursor-pointer items-center gap-3.5"
      htmlFor={id}
    >
      <div className="relative grid">
        <input
          className="peer checked:border-purple relative size-5.5 cursor-pointer appearance-none rounded-md border-[2px] bg-white"
          type="checkbox"
          id={id}
        />

        <CheckMarkIcon className="peer-checked:stroke-purple pointer-events-none absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 stroke-white peer-checked:block" />
      </div>

      <div className="text-sm leading-[1em]">{children}</div>
    </label>
  );
}

export default CheckBox;
