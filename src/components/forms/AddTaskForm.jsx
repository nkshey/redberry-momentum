import Input from "../../ui/inputs/Input";
import TextArea from "../../ui/inputs/TextArea";
import Dropdown from "../../ui/inputs/Dropdown";
import PrimaryButton from "../../ui/buttons/PrimaryButton";
import {
  useDepartments,
  useEmployees,
  usePriorities,
  useStatuses,
} from "../../api/useApis";
import { useState, useEffect, useRef } from "react";
import {
  getFromSessionStorage,
  getTomorrowDate,
  saveToSessionStorage,
} from "../../utils/helpers";
import { addTask } from "../../api/fetchers";
import { useNavigate } from "react-router-dom";

const initialFormData = {
  name: "",
  description: "",
  due_date: getTomorrowDate(),
  priority_id: 2,
  status_id: 1,
  employee_id: null,
};

const STORAGE_KEY = "task_form_data";
const DEPARTMENT_KEY = "task_form_department";

function AddTaskForm() {
  const navigate = useNavigate();

  // Initial form state with the exact structure needed for backend
  const [formData, setFormData] = useState(() =>
    getFromSessionStorage(STORAGE_KEY, initialFormData),
  );

  // Track UI state (not sent to backend)
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(() =>
    getFromSessionStorage(DEPARTMENT_KEY, null),
  );

  // Track validation state
  const [errors, setErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // API data loading hooks
  const { data: priorities, isLoading: prioritiesLoading } = usePriorities();
  const { data: statuses, isLoading: statusesLoading } = useStatuses();
  const { data: departments, isLoading: departmentsLoading } = useDepartments();
  const { data: employees, isLoading: employeesLoading } = useEmployees();

  // Save form data to sessionStorage whenever it changes
  useEffect(() => {
    saveToSessionStorage(STORAGE_KEY, formData);
  }, [formData]);

  // Save department ID to sessionStorage whenever it changes
  useEffect(() => {
    saveToSessionStorage(DEPARTMENT_KEY, selectedDepartmentId);
  }, [selectedDepartmentId]);

  // Track department changes with a ref
  const prevDepartmentIdRef = useRef(selectedDepartmentId);

  // Reset employee only when department actually changes
  useEffect(() => {
    // Only reset employee if department changed to a different value
    if (
      selectedDepartmentId &&
      selectedDepartmentId !== prevDepartmentIdRef.current
    ) {
      setFormData((prev) => ({ ...prev, employee_id: null }));
      prevDepartmentIdRef.current = selectedDepartmentId;
    }
  }, [selectedDepartmentId]);

  // Filter employees by department
  const filteredEmployees =
    employees?.filter(
      (employee) => employee.department.id === selectedDepartmentId,
    ) || [];

  const validateField = (field, value) => {
    let newErrors = { ...errors };
    delete newErrors[field];

    switch (field) {
      case "name": {
        // Trim value to remove leading/trailing spaces
        const trimmedName = value ? value.trim() : "";
        // Replace multiple spaces with single spaces for accurate character count
        const normalizedName = trimmedName.replace(/\s+/g, " ");

        if (!trimmedName) {
          newErrors[field] = true;
        } else if (normalizedName.length < 3) {
          newErrors[field] = true;
        } else if (normalizedName.length > 255) {
          newErrors[field] = true;
        }
        break;
      }

      case "description":
        if (value) {
          // First trim to remove leading/trailing spaces
          const trimmedDesc = value.trim();
          // Then normalize multiple spaces to single spaces
          const normalizedDesc = trimmedDesc.replace(/\s+/g, " ");

          // Count words more accurately by splitting on spaces and filtering empty entries
          const wordCount = normalizedDesc
            .split(" ")
            .filter((word) => word.length > 0).length;

          if (wordCount < 4) {
            newErrors[field] = true;
          } else if (normalizedDesc.length > 255) {
            newErrors[field] = true;
          }
        }
        break;

      case "due_date":
        if (!value) {
          newErrors[field] = true;
        } else {
          const today = new Date();
          today.setHours(0, 0, 0, 0);

          const selectedDate = new Date(value);
          selectedDate.setHours(0, 0, 0, 0);

          if (selectedDate < today) {
            newErrors[field] = true;
          }
        }
        break;

      case "employee_id":
        if (selectedDepartmentId && !value) {
          newErrors[field] = true;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return !newErrors[field]; // Return true if field is valid
  };

  // Handle form field changes
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setTouchedFields((prev) => ({ ...prev, [field]: true }));
    validateField(field, value);
  };

  // Mark a field as touched
  const handleBlur = (field) => {
    setTouchedFields((prev) => ({ ...prev, [field]: true }));
    validateField(field, formData[field]);
  };

  // Validate a single field

  // Validate all fields at once
  const validateForm = () => {
    const newErrors = {};

    // Validate name with improved space handling
    const trimmedName = formData.name ? formData.name.trim() : "";
    const normalizedName = trimmedName.replace(/\s+/g, " ");

    if (!trimmedName) newErrors.name = true;
    else if (normalizedName.length < 3) newErrors.name = true;
    else if (normalizedName.length > 255) newErrors.name = true;

    // Validate description if provided with improved space handling
    if (formData.description) {
      const trimmedDesc = formData.description.trim();
      const normalizedDesc = trimmedDesc.replace(/\s+/g, " ");

      const wordCount = normalizedDesc
        .split(" ")
        .filter((word) => word.length > 0).length;

      if (wordCount < 4) newErrors.description = true;
      else if (normalizedDesc.length > 255) newErrors.description = true;
    }

    // Validate due date
    if (!formData.due_date) {
      newErrors.due_date = true;
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const selectedDate = new Date(formData.due_date);
      selectedDate.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        newErrors.due_date = true;
      }
    }

    // Department is required but not in the form data we send
    if (!selectedDepartmentId) {
      newErrors.department_id = true;
    }

    // Validate employee if department is selected
    if (selectedDepartmentId && !formData.employee_id) {
      newErrors.employee_id = true;
    }

    // Validate priority
    if (!formData.priority_id) {
      newErrors.priority_id = true;
    }

    // Validate status
    if (!formData.status_id) {
      newErrors.status_id = true;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    // Mark all fields as touched, including dropdowns
    const allTouched = {
      name: true,
      description: true,
      due_date: true,
      priority_id: true,
      status_id: true,
      employee_id: true,
      department_id: true,
    };

    setTouchedFields(allTouched);

    // Validate all fields
    const isValid = validateForm();

    if (isValid) {
      addTask(formData);
      sessionStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(DEPARTMENT_KEY);
      setFormData(initialFormData);
      navigate("/");
    }
  };

  // Helper for determining field validation styling
  const getFieldStyle = (field) => {
    const isTouched = touchedFields[field] || isSubmitted;
    const hasError = errors[field];

    if (!isTouched) return "border-very-light-gray";
    return hasError ? "border-red" : "border-green";
  };

  const getRequirementStyle = (field) => {
    if (!touchedFields[field] && !isSubmitted) return "text-light-gray";
    return errors[field] ? "text-red" : "text-green";
  };

  const getDropdownStyle = (field, value) => {
    const isTouched = touchedFields[field] || isSubmitted;

    if (!isTouched) return "";
    return value ? "!border-green" : "!border-red";
  };

  // Loading state
  if (
    prioritiesLoading ||
    statusesLoading ||
    departmentsLoading ||
    employeesLoading
  )
    return <p>Loading...</p>;

  return (
    <form
      className="bg-very-light-purple/65 grid place-content-center gap-15.5 rounded-sm border border-[#DDD2FF] px-20 py-36.5"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-[repeat(2,minmax(auto,34.375rem))] gap-40">
        <div>
          <Input
            className={`mb-1 ${getFieldStyle("name")}`}
            requirement={
              <div
                className={`flex flex-col gap-0.5 text-[0.625rem] leading-[1em] ${getRequirementStyle("name")}`}
              >
                <span>მინიმუმ 3 სიმბოლო</span>
                <span>მაქსიმუმ 255 სიმბოლო</span>
              </div>
            }
            label="სათაური*"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            onBlur={() => handleBlur("name")}
          />
        </div>

        <Dropdown
          className={`w-full ${getDropdownStyle("department_id", selectedDepartmentId)}`}
          selected={"აირჩიე"}
          data={departments}
          label="დეპარტამენტი*"
          value={selectedDepartmentId}
          onChange={(newValue) => {
            setSelectedDepartmentId(newValue);
            setTouchedFields((prev) => ({ ...prev, department_id: true }));
          }}
        />
      </div>

      <div className="grid grid-cols-[repeat(2,minmax(auto,34.375rem))] gap-40">
        <TextArea
          className={`mb-1 rounded-[0.3125rem] p-3.5 ${getFieldStyle("description")}`}
          label="აღწერა"
          requirement={
            <div
              className={`flex flex-col gap-0.5 text-[0.625rem] leading-[1em] ${getRequirementStyle("description")}`}
            >
              <span>მინიმუმ 4 სიტყვა</span>
              <span>მაქსიმუმ 255 სიმბოლო</span>
            </div>
          }
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          onBlur={() => handleBlur("description")}
        />

        {selectedDepartmentId && (
          <Dropdown
            className={`w-full ${getDropdownStyle("employee_id", formData.employee_id)}`}
            data={filteredEmployees}
            label="პასუხისმგებელი თანამშრომელი*"
            value={formData.employee_id}
            onChange={(newValue) => handleChange("employee_id", newValue)}
          />
        )}
      </div>

      <div className="grid grid-cols-[repeat(2,minmax(auto,34.375rem))] gap-40">
        <div className="grid grid-cols-2 gap-8">
          <Dropdown
            className={`w-full ${getDropdownStyle("priority_id", formData.priority_id)}`}
            data={priorities}
            label="პრიორიტეტი*"
            value={formData.priority_id}
            onChange={(newValue) => handleChange("priority_id", newValue)}
          />

          <Dropdown
            className={`w-full ${getDropdownStyle("status_id", formData.status_id)}`}
            data={statuses}
            label="სტატუსი*"
            value={formData.status_id}
            onChange={(newValue) => handleChange("status_id", newValue)}
          />
        </div>

        <Input
          className={`w-[58%] ${getFieldStyle("due_date")}`}
          type="date"
          label="დედლაინი*"
          value={formData.due_date}
          onChange={(e) => handleChange("due_date", e.target.value)}
          onBlur={() => handleBlur("due_date")}
        />
      </div>

      <PrimaryButton className="mt-21 h-10.5 place-self-end text-lg">
        დავალების შექმნა
      </PrimaryButton>
    </form>
  );
}

export default AddTaskForm;
