import GalleryIcon from "../../ui/icons/GalleryIcon";
import TrashIcon from "../../ui/icons/TrashIcon";
import ValidationRequirement from "../../ui/validation/ValidationRequirement";

function ImageUpload({
  value,
  imagePreview,
  onChange,
  onRemove,
  isSubmitAttempted,
  errors,
  disabled,
}) {
  return (
    <div className="col-span-full">
      <label
        className={`${
          !value
            ? isSubmitAttempted
              ? "border-red"
              : "border-very-light-gray"
            : errors.size || errors.type
              ? "border-red"
              : "border-green"
        } ${disabled ? "cursor-not-allowed" : "cursor-pointer"} col-span-full mb-1 flex h-30 w-full flex-col items-center justify-center rounded-md border border-dashed`}
      >
        {imagePreview ? (
          <div className="relative">
            <img
              className="size-22 rounded-full object-cover"
              src={imagePreview}
            />

            <div
              className="border-light-gray group absolute right-0 bottom-0 grid size-6 place-content-center rounded-full border bg-white transition-all hover:brightness-80"
              onClick={(e) => onRemove(e)}
            >
              <TrashIcon />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1.5">
            <GalleryIcon />
            <p className="text-sm leading-[1em]">ატვირთე ფოტო</p>
          </div>
        )}

        <input
          className="hidden disabled:cursor-not-allowed"
          type="file"
          accept="image/*"
          disabled={disabled}
          onChange={onChange}
        />
      </label>

      <div className="flex flex-col gap-0.5 text-[0.625rem] leading-[1em]">
        <ValidationRequirement
          showField={value}
          isSubmitAttempted={isSubmitAttempted}
          hasError={errors.size}
        >
          მაქსიმუმ 600kb
        </ValidationRequirement>

        <ValidationRequirement
          showField={value}
          isSubmitAttempted={isSubmitAttempted}
          hasError={errors.type}
        >
          სურათის ტიპის
        </ValidationRequirement>
      </div>
    </div>
  );
}

export default ImageUpload;
