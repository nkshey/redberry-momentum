import PrimaryButton from "../ui/buttons/PrimaryButton";
import SecondaryButton from "../ui/buttons/SecondaryButton";
import PlusIcon from "../ui/icons/PlusIcon";

function CTAButtons() {
  return (
    <div className="flex items-center gap-10">
      <SecondaryButton>თანამშრომლის დამატება</SecondaryButton>

      <PrimaryButton>
        <PlusIcon />
        შექმენი ახალი დავალება
      </PrimaryButton>
    </div>
  );
}

export default CTAButtons;
