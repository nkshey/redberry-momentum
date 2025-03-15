import { useState } from "react";
import { useComments, useStatuses } from "../../../api/useApis";
import PrimaryButton from "../../../ui/buttons/PrimaryButton";
import CalendarIcon from "../../../ui/icons/CalendarIcon";
import PieChartIcon from "../../../ui/icons/PieChartIcon";
import UserIcon from "../../../ui/icons/UserIcon";
import Dropdown from "../../../ui/inputs/Dropdown";
import { updateTaskStatus } from "../../../api/fetchers";
import { formatDate } from "../../../utils/helpers";

function TaskPageTaskDetails({
  taskId,
  status,
  employeeAvatar,
  employeeDepartment,
  employeeName,
  dueDate,
}) {
  const [currentStatus, setCurrentStatus] = useState(status);
  const [originalStatus, setOriginalStatus] = useState(status);
  const [isUpdating, setIsUpdating] = useState(false);
  const hasStatusChanged = currentStatus.id !== originalStatus.id;

  async function handleStatusUpdate() {
    setIsUpdating(true);

    await updateTaskStatus(taskId, currentStatus.id);

    setOriginalStatus(currentStatus);
    setIsUpdating(false);
  }

  return (
    <div>
      <p className="mb-7 text-2xl font-medium">დავალების დეტალები</p>

      <div className="flex max-w-fit flex-col gap-10">
        <Status
          currentStatus={currentStatus}
          onStatusChange={setCurrentStatus}
        />

        <Employee
          employeeAvatar={employeeAvatar}
          employeeDepartment={employeeDepartment}
          employeeName={employeeName}
        />

        <DueDate dueDate={dueDate} />

        {hasStatusChanged && (
          <PrimaryButton
            className="-mt-4 h-9 place-self-end"
            disabled={isUpdating}
            onClick={handleStatusUpdate}
          >
            {isUpdating ? "ინახება..." : "შენახვა"}
          </PrimaryButton>
        )}
      </div>
    </div>
  );
}

function Status({ currentStatus, onStatusChange }) {
  const { data, isLoading } = useStatuses();

  function handleStatusChange(item) {
    onStatusChange(item);
  }

  return (
    <div className="flex items-center gap-17.5">
      <span className="flex w-41 items-center gap-1.5 text-[#474747]">
        <PieChartIcon />
        სტატუსი
      </span>

      <Dropdown
        className="w-65"
        selected={currentStatus.name}
        data={data}
        isLoading={isLoading}
        handleSelect={handleStatusChange}
      />
    </div>
  );
}

function Employee({ employeeAvatar, employeeName, employeeDepartment }) {
  return (
    <div className="flex items-center gap-17.5">
      <span className="flex w-41 items-center gap-1.5 text-[#474747]">
        <UserIcon />
        თანამშრომელი
      </span>

      <div className="flex items-center gap-3">
        <img
          className="size-8 rounded-full"
          src={employeeAvatar}
          alt={employeeName}
        />

        <div className="leading-[1em]">
          <span className="text-[0.6875rem] leading-0 font-light">
            {employeeDepartment}
          </span>

          <p className="text-sm">{employeeName}</p>
        </div>
      </div>
    </div>
  );
}

function DueDate({ dueDate }) {
  return (
    <div className="flex items-center gap-17.5">
      <span className="flex w-41 items-center gap-1.5 text-[#474747]">
        <CalendarIcon />
        დავალების ვადა
      </span>

      <p className="text-sm">{formatDate(dueDate)}</p>
    </div>
  );
}

export default TaskPageTaskDetails;
