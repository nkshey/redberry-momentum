import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { addTask } from "../../api/fetchers";
import {
  useDepartments,
  useEmployees,
  usePriorities,
  useStatuses,
} from "../../api/useApis";
import {
  getFromLocalStorage,
  getTomorrowDate,
  removeFromLocalStorage,
  saveToLocalStorage,
} from "../../utils/helpers";

import Input from "../../ui/inputs/Input";
import TextArea from "../../ui/inputs/TextArea";
import Dropdown from "../../ui/inputs/Dropdown";
import PrimaryButton from "../../ui/buttons/PrimaryButton";
import LoadingOverlay from "../../ui/feedback/LoadingOverlay";
import AddEmployeeModal from "../../components/AddEmployeeModal";

const STORAGE_KEYS = {
  FORM_DATA: "task_form_data",
  SELECTED_DEPARTMENT: "task_form_department",
  ERRORS: "task_form_errors",
};

const initialFormData = {
  name: "",
  description: "",
  due_date: getTomorrowDate(),
  priority_id: 2,
  status_id: 1,
  employee_id: null,
};

const initialFormErrors = {
  name: {
    minLength: false,
    maxLength: false,
  },
  description: {
    minWords: false,
    maxLength: false,
  },
};

function AddTaskForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(() =>
    getFromLocalStorage(STORAGE_KEYS.FORM_DATA, initialFormData),
  );
  const [errors, setErrors] = useState(() =>
    getFromLocalStorage(STORAGE_KEYS.ERRORS, initialFormErrors),
  );
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(() =>
    getFromLocalStorage(STORAGE_KEYS.SELECTED_DEPARTMENT, null),
  );
  const [isSubmitAttempted, setIsSubmitAttempted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // API data loading hooks
  const { data: priorities, isLoading: prioritiesLoading } = usePriorities();
  const { data: statuses, isLoading: statusesLoading } = useStatuses();
  const { data: departments, isLoading: departmentsLoading } = useDepartments();
  const {
    data: employees,
    isLoading: employeesLoading,
    refetch: refetchEmployees,
  } = useEmployees();

  const filteredEmployees = employees?.filter(
    (employee) => employee.department.id === selectedDepartmentId,
  );

  // useEffects to save state changes
  useEffect(() => {
    saveToLocalStorage(STORAGE_KEYS.FORM_DATA, formData);
  }, [formData]);

  useEffect(() => {
    saveToLocalStorage(STORAGE_KEYS.ERRORS, errors);
  }, [errors]);

  useEffect(() => {
    saveToLocalStorage(STORAGE_KEYS.SELECTED_DEPARTMENT, selectedDepartmentId);
  }, [selectedDepartmentId]);

  // This code tracks department changes and resets employee selection when department changes
  // Store the previous department to detect changes
  const prevDepartmentRef = useRef(null);
  // Reset employee_id when department changes
  useEffect(() => {
    // Only run logic after initial render
    if (
      prevDepartmentRef.current !== null &&
      prevDepartmentRef.current !== selectedDepartmentId
    ) {
      // Reset employee_id when department changes
      setFormData((prevData) => ({ ...prevData, employee_id: null }));
    }
    // Always update reference to current department
    prevDepartmentRef.current = selectedDepartmentId;
  }, [selectedDepartmentId]);

  function handleChange(e) {
    const { name, value } = e.target;

    switch (name) {
      case "name":
        setErrors((prevErrors) => ({
          ...prevErrors,
          name: {
            ...prevErrors.name,
            minLength: value.replace(/\s/g, "").length < 3,
            maxLength: value.length > 255,
          },
        }));
        break;

      case "description":
        setErrors((prevErrors) => ({
          ...prevErrors,
          description: {
            ...prevErrors.description,
            minWords: value.trim().split(/\s+/).filter(Boolean).length < 4,
            maxLength: value.length > 255,
          },
        }));
        break;
    }

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  function handleDropdown(name, value) {
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
    saveToLocalStorage(STORAGE_KEYS.FORM_DATA, updatedFormData);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    setIsSubmitAttempted(true);

    // Check if required fields are empty
    const isNameEmpty = !formData.name.trim();
    const isEmployeeEmpty = !formData.employee_id;
    const isDepartmentEmpty = !selectedDepartmentId;

    const isDescriptionNotEmpty = formData.description.trim();

    const hasDescriptionErrors =
      isDescriptionNotEmpty &&
      (formData.description.trim().split(/\s+/).filter(Boolean).length < 4 ||
        formData.description.length > 255);

    const hasNameErrors = errors.name.minLength || errors.name.maxLength;

    // Update errors state with required field validations
    setErrors({
      name: {
        minLength: isNameEmpty || formData.name.replace(/\s/g, "").length < 3,
        maxLength: formData.name.length > 255,
      },
      description: {
        minWords:
          isDescriptionNotEmpty &&
          formData.description.trim().split(/\s+/).filter(Boolean).length < 4,
        maxLength: formData.description.length > 255,
      },
    });

    if (
      isNameEmpty ||
      isDepartmentEmpty ||
      isEmployeeEmpty ||
      hasNameErrors ||
      hasDescriptionErrors
    ) {
      return;
    } else {
      try {
        setIsSubmitting(true);
        await addTask(formData);

        // Clear all stored form data
        removeFromLocalStorage(STORAGE_KEYS.FORM_DATA);
        removeFromLocalStorage(STORAGE_KEYS.ERRORS);
        removeFromLocalStorage(STORAGE_KEYS.SELECTED_DEPARTMENT);

        navigate("/");
      } catch (error) {
        console.error("Failed to add task: ", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  }

  if (
    prioritiesLoading ||
    statusesLoading ||
    departmentsLoading ||
    employeesLoading
  )
    return <p>Loading...</p>;

  return (
    <form
      className="bg-very-light-purple/65 relative grid place-content-center gap-15.5 rounded-sm border border-[#DDD2FF] px-20 py-36.5"
      noValidate
      onSubmit={handleSubmit}
    >
      {isSubmitting && <LoadingOverlay message="დავალება იქმნება..." />}

      <div className="grid grid-cols-[repeat(2,minmax(auto,34.375rem))] gap-40">
        <div>
          <Input
            className={`mb-1 ${
              !formData.name
                ? isSubmitAttempted
                  ? "border-red"
                  : "border-very-light-gray"
                : errors.name.minLength || errors.name.maxLength
                  ? "border-red"
                  : "border-green"
            }`}
            requirement={
              <div
                className={`flex flex-col gap-0.5 text-[0.625rem] leading-[1em]`}
              >
                <span
                  className={
                    !formData.name
                      ? isSubmitAttempted
                        ? "text-red"
                        : "text-light-gray"
                      : errors.name.minLength
                        ? "text-red"
                        : "text-green"
                  }
                >
                  მინიმუმ 3 სიმბოლო
                </span>
                <span
                  className={
                    !formData.name
                      ? isSubmitAttempted
                        ? "text-red"
                        : "text-light-gray"
                      : errors.name.maxLength
                        ? "text-red"
                        : "text-green"
                  }
                >
                  მაქსიმუმ 255 სიმბოლო
                </span>
              </div>
            }
            label="სათაური*"
            name="name"
            disabled={isSubmitting}
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <Dropdown
          className={
            !selectedDepartmentId && isSubmitAttempted
              ? "!border-red"
              : selectedDepartmentId && "!border-green"
          }
          label="დეპარტამენტი*"
          disabled={isSubmitting}
          data={departments}
          value={selectedDepartmentId}
          onChange={(id) => setSelectedDepartmentId(id)}
        />
      </div>

      <div className="grid grid-cols-[repeat(2,minmax(auto,34.375rem))] gap-40">
        <TextArea
          className={`mb-1 rounded-md p-3.5 ${
            !formData.description.trim()
              ? isSubmitAttempted
                ? "border-green"
                : "border-very-light-gray"
              : errors.description.minWords || errors.description.maxLength
                ? "border-red"
                : "border-green"
          }`}
          requirement={
            <div className="flex flex-col gap-0.5 text-[0.625rem] leading-[1em]">
              <span
                className={
                  !formData.description.trim()
                    ? isSubmitAttempted
                      ? "text-green"
                      : "text-light-gray"
                    : errors.description.minWords
                      ? "text-red"
                      : "text-green"
                }
              >
                მინიმუმ 4 სიტყვა
              </span>
              <span
                className={
                  !formData.description.trim()
                    ? isSubmitAttempted
                      ? "text-green"
                      : "text-light-gray"
                    : errors.description.maxLength
                      ? "text-red"
                      : "text-green"
                }
              >
                მაქსიმუმ 255 სიმბოლო
              </span>
            </div>
          }
          label="აღწერა"
          name="description"
          disabled={isSubmitting}
          value={formData.description}
          onChange={handleChange}
        />

        {selectedDepartmentId && (
          <Dropdown
            className={
              !formData.employee_id && isSubmitAttempted
                ? "!border-red"
                : formData.employee_id && "!border-green"
            }
            label="პასუხისმგებელი თანამშრომელი*"
            isEmployee={true}
            data={filteredEmployees}
            value={formData.employee_id}
            onChange={(id) => handleDropdown("employee_id", id)}
            onAddEmployee={() => setIsModalOpen(true)}
          />
        )}
      </div>

      <div className="grid grid-cols-[repeat(2,minmax(auto,34.375rem))] gap-40">
        <div className="grid grid-cols-2 gap-8">
          <Dropdown
            className={
              !formData.priority_id && isSubmitAttempted
                ? "!border-red"
                : isSubmitAttempted && "!border-green"
            }
            label="პრიორიტეტი*"
            data={priorities}
            disabled={isSubmitting}
            value={formData.priority_id}
            onChange={(id) => handleDropdown("priority_id", id)}
          />

          <Dropdown
            className={
              !formData.status_id && isSubmitAttempted
                ? "!border-red"
                : isSubmitAttempted && "!border-green"
            }
            label="სტატუსი*"
            data={statuses}
            disabled={isSubmitting}
            value={formData.status_id}
            onChange={(id) => handleDropdown("status_id", id)}
          />
        </div>

        <Input
          className={`border-very-light-gray w-[58%] ${
            !formData.due_date && isSubmitAttempted
              ? "!border-red"
              : isSubmitAttempted && "!border-green"
          }`}
          type="date"
          min={new Date().toISOString().split("T")[0]}
          label="დედლაინი*"
          name="due_date"
          disabled={isSubmitting}
          value={formData.due_date}
          onChange={handleChange}
        />
      </div>

      <PrimaryButton
        className="mt-21 h-10.5 place-self-end text-lg"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "იქმნება..." : "დავალების შექმნა"}
      </PrimaryButton>

      {isModalOpen && (
        <AddEmployeeModal
          setIsModalOpen={setIsModalOpen}
          onSuccess={refetchEmployees}
          selectedDepartmentId={selectedDepartmentId}
        />
      )}
    </form>
  );
}

export default AddTaskForm;
