import Input from "../../ui/inputs/Input";
import TextArea from "../../ui/inputs/TextArea";
import Dropdown from "../../ui/inputs/Dropdown";
import PrimaryButton from "../../ui/buttons/PrimaryButton";

function AddTaskForm() {
  return (
    <form className="bg-very-light-purple/65 grid place-content-center gap-15.5 rounded-sm border border-[#DDD2FF] px-20 py-36.5">
      <div className="grid grid-cols-[repeat(2,minmax(auto,34.375rem))] gap-40">
        <Input
          label="სათაური*"
          requirement={
            <div className="text-light-gray flex flex-col text-[0.625rem] leading-[1em] font-light">
              <span>მინიმუმ 2 სიმბოლო</span>
              <span>მაქსიმუმ 255 სიმბოლო</span>
            </div>
          }
        />

        <Dropdown label="დეპარტამენტი*" />
      </div>

      <div className="grid grid-cols-[repeat(2,minmax(auto,34.375rem))] gap-40">
        <TextArea
          label="აღწერა*"
          requirement={
            <div className="text-light-gray flex flex-col text-[0.625rem] leading-[1em] font-light">
              <span>მინიმუმ 2 სიმბოლო</span>
              <span>მაქსიმუმ 255 სიმბოლო</span>
            </div>
          }
        />

        <Dropdown label="პასუხისმგებელი თანამშრომელი*" />
      </div>

      <div className="grid grid-cols-[repeat(2,minmax(auto,34.375rem))] gap-40">
        <div className="grid grid-cols-2 gap-8">
          <Dropdown label="პრიორიტეტი*" />
          <Dropdown label="სტატუსი*" />
        </div>

        <Dropdown label="დედლაინი*" />
      </div>

      <PrimaryButton className="mt-21 place-self-end text-lg">
        დავალების შექმნა
      </PrimaryButton>
    </form>
  );
}

export default AddTaskForm;
