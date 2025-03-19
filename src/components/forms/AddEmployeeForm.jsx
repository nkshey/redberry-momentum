import { useState } from "react";
import { useDepartments } from "../../api/useApis";
import { addEmployee } from "../../api/fetchers";

import Input from "../../ui/inputs/Input";
import Dropdown from "../../ui/inputs/Dropdown";
import ImageUpload from "../../ui/inputs/ImageUpload";
import PrimaryButton from "../../ui/buttons/PrimaryButton";
import SecondaryButton from "../../ui/buttons/SecondaryButton";
import LoadingOverlay from "../../ui/feedback/LoadingOverlay";
import ValidationRequirement from "../../ui/validation/ValidationRequirement";

const initialFormData = {
  name: "",
  surname: "",
  avatar: "",
  department_id: null,
};

const initialFormErrors = {
  name: {
    minLength: false,
    maxLength: false,
    characters: false,
  },
  surname: {
    minLength: false,
    maxLength: false,
    characters: false,
  },
  avatar: {
    size: false,
    type: false,
  },
  department: false,
};

const MAX_FILE_SIZE = 600 * 1024;
const nameRegex = /^[a-zA-Zა-ჰ\s]*$/;

function AddEmployeeForm({ setIsModalOpen, onSuccess, selectedDepartmentId }) {
  const { data: departments } = useDepartments();
  const [formData, setFormData] = useState({
    ...initialFormData,
    department_id: selectedDepartmentId,
  });
  const [errors, setErrors] = useState(initialFormErrors);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitAttempted, setIsSubmitAttempted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    switch (name) {
      case "name":
        setErrors((prevErrors) => ({
          ...prevErrors,
          name: {
            ...prevErrors.name,
            minLength: value.replace(/\s/g, "").length < 2,
            maxLength: value.length > 255,
            characters: !nameRegex.test(value) || !value.trim(),
          },
        }));
        break;

      case "surname":
        setErrors((prevErrors) => ({
          ...prevErrors,
          surname: {
            ...prevErrors.surname,
            minLength: value.replace(/\s/g, "").length < 2,
            maxLength: value.length > 255,
            characters: !nameRegex.test(value) || !value.trim(),
          },
        }));
        break;
    }

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  function handleFileChange(e) {
    const file = e.target.files[0];

    if (!file) return;

    const isOversize = file.size > MAX_FILE_SIZE;
    const isNotImage = !file.type.startsWith("image/");

    setErrors((prevErrors) => ({
      ...prevErrors,
      avatar: {
        ...prevErrors.avatar,
        size: isOversize,
        type: isNotImage,
      },
    }));

    setFormData((prevData) => ({ ...prevData, avatar: file }));

    if (!isOversize && !isNotImage) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  }

  function handleRemoveFile(e) {
    e.preventDefault();
    e.stopPropagation();

    setFormData((prevData) => ({ ...prevData, avatar: "" }));

    setImagePreview(null);

    setErrors((prevErrors) => ({
      ...prevErrors,
      avatar: {
        ...prevErrors.avatar,
        size: false,
        type: false,
      },
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    setIsSubmitAttempted(true);

    // Check if required fields are empty
    const isNameEmpty = !formData.name.trim();
    const isSurnameEmpty = !formData.surname.trim();
    const isAvatarEmpty = !formData.avatar;
    const isDepartmentEmpty = !formData.department_id;

    // Update errors state with required field validations
    setErrors((prevErrors) => ({
      ...prevErrors,
      name: {
        ...prevErrors.name,
        minLength: isNameEmpty || formData.name.replace(/\s/g, "").length < 2,
        maxLength: formData.name.length > 255,
        characters: isNameEmpty || !nameRegex.test(formData.name),
      },
      surname: {
        ...prevErrors.surname,
        minLength:
          isSurnameEmpty || formData.surname.replace(/\s/g, "").length < 2,
        maxLength: formData.surname.length > 255,
        characters: isSurnameEmpty || !nameRegex.test(formData.surname),
      },
      avatar: {
        ...prevErrors.avatar,
      },
      department: isDepartmentEmpty,
    }));

    const hasNameErrors =
      errors.name.minLength || errors.name.maxLength || errors.name.characters;
    const hasSurnameErrors =
      errors.surname.minLength ||
      errors.surname.maxLength ||
      errors.surname.characters;
    const hasFileErrors = errors.avatar.size || errors.avatar.type;
    const hasDepartmentErrors = errors.department;

    if (
      isNameEmpty ||
      isSurnameEmpty ||
      isAvatarEmpty ||
      isDepartmentEmpty ||
      hasNameErrors ||
      hasSurnameErrors ||
      hasFileErrors ||
      hasDepartmentErrors
    ) {
      return;
    } else {
      try {
        setIsSubmitting(true);
        await addEmployee(formData);
        setIsModalOpen(false);

        if (onSuccess) {
          onSuccess();
        }
      } catch (error) {
        console.error("Failed to add employee: ", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  }

  return (
    <form
      className="mt-11 grid grid-cols-2 gap-11"
      noValidate
      onSubmit={handleSubmit}
    >
      {isSubmitting && (
        <LoadingOverlay
          parentClassName="rounded-[0.625rem]"
          message="თანამშრომელი იქმნება..."
        />
      )}

      <Input
        className={`mb-1 ${
          !formData.name
            ? isSubmitAttempted
              ? "border-red"
              : "border-very-light-gray"
            : errors.name.minLength ||
                errors.name.maxLength ||
                errors.name.characters
              ? "border-red"
              : "border-green"
        }`}
        requirement={
          <div className="flex flex-col gap-0.5 text-[0.625rem] leading-[1em]">
            <ValidationRequirement
              showField={formData.name}
              isSubmitAttempted={isSubmitAttempted}
              hasError={errors.name.minLength}
            >
              მინიმუმ 2 სიმბოლო
            </ValidationRequirement>

            <ValidationRequirement
              showField={formData.name}
              isSubmitAttempted={isSubmitAttempted}
              hasError={errors.name.maxLength}
            >
              მაქსიმუმ 255 სიმბოლო
            </ValidationRequirement>

            <ValidationRequirement
              showField={formData.name}
              isSubmitAttempted={isSubmitAttempted}
              hasError={errors.name.characters}
            >
              მხოლოდ ლათინური და ქართული სიმბოლოები
            </ValidationRequirement>
          </div>
        }
        label="სახელი*"
        name="name"
        disabled={isSubmitting}
        value={formData.name}
        onChange={handleChange}
      />

      <Input
        className={`mb-1 ${
          !formData.surname
            ? isSubmitAttempted
              ? "border-red"
              : "border-very-light-gray"
            : errors.surname.minLength ||
                errors.surname.maxLength ||
                errors.surname.characters
              ? "border-red"
              : "border-green"
        }`}
        requirement={
          <div className="flex flex-col gap-0.5 text-[0.625rem] leading-[1em]">
            <ValidationRequirement
              showField={formData.surname}
              isSubmitAttempted={isSubmitAttempted}
              hasError={errors.surname.minLength}
            >
              მინიმუმ 2 სიმბოლო
            </ValidationRequirement>

            <ValidationRequirement
              showField={formData.surname}
              isSubmitAttempted={isSubmitAttempted}
              hasError={errors.surname.maxLength}
            >
              მაქსიმუმ 255 სიმბოლო
            </ValidationRequirement>

            <ValidationRequirement
              showField={formData.surname}
              isSubmitAttempted={isSubmitAttempted}
              hasError={errors.surname.characters}
            >
              მხოლოდ ლათინური და ქართული სიმბოლოები
            </ValidationRequirement>
          </div>
        }
        label="გვარი*"
        name="surname"
        disabled={isSubmitting}
        value={formData.surname}
        onChange={handleChange}
      />

      <ImageUpload
        value={formData.avatar}
        imagePreview={imagePreview}
        onChange={handleFileChange}
        onRemove={handleRemoveFile}
        isSubmitAttempted={isSubmitAttempted}
        errors={errors.avatar}
        disabled={isSubmitting}
      />

      <Dropdown
        className={
          !formData.department_id && isSubmitAttempted
            ? "!border-red"
            : !formData.department_id
              ? ""
              : "!border-green"
        }
        label="დეპარტამენტი*"
        data={departments}
        disabled={isSubmitting}
        value={formData.department_id}
        onChange={(id) =>
          setFormData((prevData) => ({ ...prevData, department_id: id }))
        }
      />

      <div className="col-start-2 row-start-4 grid grid-cols-[102px_1fr] gap-5.5">
        <SecondaryButton
          className="grid h-10.5 place-content-center !px-4"
          onClick={() => setIsModalOpen(false)}
          disabled={isSubmitting}
        >
          გაუქმება
        </SecondaryButton>

        <PrimaryButton
          className="grid h-10.5 w-full place-content-center !px-4.5 text-lg"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "იქმნება..." : "დაამატე თანამშრომელი"}
        </PrimaryButton>
      </div>
    </form>
  );
}

export default AddEmployeeForm;
