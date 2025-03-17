import { useRef } from "react";
import CancelIcon from "../ui/icons/CancelIcon";
import AddEmployeeForm from "./forms/AddEmployeeForm";
import { useClickOutside } from "../hooks/useClickOutside";

function AddEmployeeModal({ setIsModalOpen }) {
  const modalRef = useRef(null);

  useClickOutside(modalRef, () => setIsModalOpen(false));

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-[#0d0f10]/15 backdrop-blur-[0.3125rem]">
      <div
        className="w-full max-w-228 rounded-[0.625rem] bg-white px-12.5 pt-10 pb-15"
        ref={modalRef}
      >
        <button
          className="mb-9 grid cursor-pointer place-self-end rounded-full"
          type="button"
          onClick={() => setIsModalOpen(false)}
        >
          <CancelIcon />
        </button>

        <h3 className="text-center text-[2rem] leading-[1em] font-medium">
          თანამშრომლის დამატება
        </h3>

        <AddEmployeeForm setIsModalOpen={setIsModalOpen} />
      </div>
    </div>
  );
}

export default AddEmployeeModal;
