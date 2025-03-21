import { useState } from "react";
import { useStatuses } from "../../../api/useApis";
import { updateTaskStatus } from "../../../api/fetchers";
import { useQueryClient } from "@tanstack/react-query";
import { formatDate } from "../../../utils/helpers";

import CalendarIcon from "../../../ui/icons/CalendarIcon";
import PieChartIcon from "../../../ui/icons/PieChartIcon";
import UserIcon from "../../../ui/icons/UserIcon";
import Dropdown from "../../../ui/inputs/Dropdown";

function TaskPageTaskDetails({
  taskId,
  status,
  employeeAvatar,
  employeeDepartment,
  employeeName,
  dueDate,
}) {
  const queryClient = useQueryClient();
  const [currentStatus, setCurrentStatus] = useState(status);
  const [isUpdating, setIsUpdating] = useState(false);

  async function handleStatusChange(newStatus) {
    if (newStatus.id === currentStatus.id) return;

    setIsUpdating(true);

    try {
      await updateTaskStatus(taskId, newStatus.id);
      queryClient.invalidateQueries(["task", taskId]);
      queryClient.invalidateQueries(["tasks"]);
      setCurrentStatus(newStatus);
    } catch (error) {
      console.error("Failed to update task status: ", error);
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <div>
      <p className="mb-7 text-2xl font-medium">დავალების დეტალები</p>

      <div className="flex max-w-fit flex-col gap-10">
        <Status
          currentStatus={currentStatus}
          onStatusChange={handleStatusChange}
          isUpdating={isUpdating}
        />

        <Employee
          employeeAvatar={employeeAvatar}
          employeeDepartment={employeeDepartment}
          employeeName={employeeName}
        />

        <DueDate dueDate={dueDate} />
      </div>
    </div>
  );
}

function Status({ currentStatus, onStatusChange, isUpdating }) {
  const { data } = useStatuses();

  function handleStatusChange(statusId) {
    const selectedStatus = data.find((status) => status.id === statusId);
    if (selectedStatus) {
      onStatusChange(selectedStatus);
    }
  }

  return (
    <div className="flex items-center gap-17.5">
      <span className="flex w-41 items-center gap-1.5 text-[#474747]">
        <PieChartIcon />
        სტატუსი
      </span>

      <Dropdown
        className="w-65"
        data={data}
        value={currentStatus.id}
        onChange={handleStatusChange}
        disabled={isUpdating}
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
