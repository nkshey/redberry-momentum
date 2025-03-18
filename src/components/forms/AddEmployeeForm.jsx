import { useRef, useState } from "react";
import { useDepartments } from "../../api/useApis";
import TrashIcon from "../../ui/icons/TrashIcon";
import Input from "../../ui/inputs/Input";
import Dropdown from "../../ui/inputs/Dropdown";
import SecondaryButton from "../../ui/buttons/SecondaryButton";
import PrimaryButton from "../../ui/buttons/PrimaryButton";
import { addEmployee } from "../../api/fetchers";

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

function AddEmployeeForm({ setIsModalOpen }) {
  const { data: departments } = useDepartments();
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState(initialFormErrors);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitAttempted, setIsSubmitAttempted] = useState(false);
  const fileInputRef = useRef(null);

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

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

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

  function handleSubmit(e) {
    e.preventDefault();

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
      setErrors(initialFormErrors);
      setFormData(initialFormData);
      addEmployee(formData);
      setIsModalOpen(false);
    }
  }

  return (
    <form
      className="mt-11 grid grid-cols-2 gap-11"
      noValidate
      onSubmit={handleSubmit}
    >
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
              მინიმუმ 2 სიმბოლო
            </span>
            <span
              className={
                !formData.name
                  ? isSubmitAttempted
                    ? "text-green"
                    : "text-light-gray"
                  : errors.name.maxLength
                    ? "text-red"
                    : "text-green"
              }
            >
              მაქსიმუმ 255 სიმბოლო
            </span>
            <span
              className={
                !formData.name
                  ? isSubmitAttempted
                    ? "text-red"
                    : "text-light-gray"
                  : errors.name.characters
                    ? "text-red"
                    : "text-green"
              }
            >
              მხოლოდ ლათინური და ქართული სიმბოლოები
            </span>
          </div>
        }
        label="სახელი*"
        name="name"
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
            <span
              className={
                !formData.surname
                  ? isSubmitAttempted
                    ? "text-red"
                    : "text-light-gray"
                  : errors.surname.minLength
                    ? "text-red"
                    : "text-green"
              }
            >
              მინიმუმ 2 სიმბოლო
            </span>
            <span
              className={
                !formData.surname
                  ? isSubmitAttempted
                    ? "text-green"
                    : "text-light-gray"
                  : errors.surname.maxLength
                    ? "text-red"
                    : "text-green"
              }
            >
              მაქსიმუმ 255 სიმბოლო
            </span>
            <span
              className={
                !formData.surname
                  ? isSubmitAttempted
                    ? "text-red"
                    : "text-light-gray"
                  : errors.surname.characters
                    ? "text-red"
                    : "text-green"
              }
            >
              მხოლოდ ლათინური და ქართული სიმბოლოები
            </span>
          </div>
        }
        label="გვარი*"
        name="surname"
        onChange={handleChange}
      />

      <div className="col-span-full">
        <label
          className={`${
            !formData.avatar
              ? isSubmitAttempted
                ? "border-red"
                : "border-very-light-gray"
              : errors.avatar.size || errors.avatar.type
                ? "border-red"
                : "border-green"
          } col-span-full mb-1 flex h-30 w-full cursor-pointer flex-col items-center justify-center rounded-md border border-dashed`}
        >
          {imagePreview ? (
            <div className="relative">
              <img
                className="size-22 rounded-full object-cover"
                src={imagePreview}
              />

              <div
                className="border-light-gray group absolute right-0 bottom-0 grid size-6 place-content-center rounded-full border bg-white transition-all hover:brightness-80"
                onClick={handleRemoveFile}
              >
                <TrashIcon />
              </div>
            </div>
          ) : (
            <p>აირჩიეთ ფოტო</p>
          )}

          <input
            className="hidden"
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </label>

        <div className="flex flex-col gap-0.5 text-[0.625rem] leading-[1em]">
          <span
            className={` ${
              !formData.avatar
                ? isSubmitAttempted
                  ? "text-red"
                  : "text-light-gray"
                : errors.avatar.size
                  ? "text-red"
                  : "text-green"
            }`}
          >
            მაქსიმუმ 600kb
          </span>
          <span
            className={` ${
              !formData.avatar
                ? isSubmitAttempted
                  ? "text-red"
                  : "text-light-gray"
                : errors.avatar.type
                  ? "text-red"
                  : "text-green"
            }`}
          >
            სურათის ტიპი
          </span>
        </div>
      </div>

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
        value={formData.department_id}
        onChange={(id) =>
          setFormData((prevData) => ({ ...prevData, department_id: id }))
        }
      />

      <div className="col-start-2 row-start-4 grid grid-cols-[102px_1fr] gap-5.5">
        <SecondaryButton
          className="grid h-10.5 place-content-center !px-4"
          onClick={() => setIsModalOpen(false)}
        >
          გაუქმება
        </SecondaryButton>
        <PrimaryButton
          className="grid h-10.5 w-full place-content-center !px-4.5 text-lg"
          type="submit"
        >
          დაამატე თანამშრომელი
        </PrimaryButton>
      </div>
    </form>
  );
}

export default AddEmployeeForm;
