import { Link } from "react-router-dom";
import PrimaryButton from "../../ui/buttons/PrimaryButton";
import SecondaryButton from "../../ui/buttons/SecondaryButton";
import PlusIcon from "../../ui/icons/PlusIcon";

function CTAButtons() {
  return (
    <div className="flex items-center gap-10">
      <SecondaryButton>თანამშრომლის დამატება</SecondaryButton>

      <Link to="/add">
        <PrimaryButton className="h-10">
          <PlusIcon />
          შექმენი ახალი დავალება
        </PrimaryButton>
      </Link>
    </div>
  );
}

export default CTAButtons;
