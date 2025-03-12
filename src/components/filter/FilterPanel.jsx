import PrimaryButton from "../../ui/buttons/PrimaryButton";

function FilterPanel({ ref, children }) {
  return (
    <div
      className="border-purple absolute top-[calc(100%+0.625rem)] -left-[1px] w-fit min-w-[calc(100%+2px)] rounded-[0.625rem] border bg-white px-7.5 pt-10 pb-5"
      ref={ref}
    >
      {children}

      <PrimaryButton className="mt-6 h-9 place-self-end rounded-full px-12.5">
        არჩევა
      </PrimaryButton>
    </div>
  );
}

export default FilterPanel;
