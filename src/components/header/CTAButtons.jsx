import { useState } from "react";
import { Link } from "react-router-dom";

import PlusIcon from "../../ui/icons/PlusIcon";
import PrimaryButton from "../../ui/buttons/PrimaryButton";
import SecondaryButton from "../../ui/buttons/SecondaryButton";
import AddEmployeeModal from "../AddEmployeeModal";

function CTAButtons() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex items-center gap-10">
      <SecondaryButton className="h-10" onClick={() => setIsModalOpen(true)}>
        თანამშრომლის დამატება
      </SecondaryButton>

      <Link to="/add">
        <PrimaryButton className="h-10">
          <PlusIcon />
          შექმენი ახალი დავალება
        </PrimaryButton>
      </Link>

      {isModalOpen && <AddEmployeeModal setIsModalOpen={setIsModalOpen} />}
    </div>
  );
}

export default CTAButtons;
