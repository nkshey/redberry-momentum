import { useStatuses } from "../../../api/useApis";
import CalendarIcon from "../../../ui/icons/CalendarIcon";
import PieChartIcon from "../../../ui/icons/PieChartIcon";
import UserIcon from "../../../ui/icons/UserIcon";
import Dropdown from "../../../ui/inputs/Dropdown";

function TaskPageTaskDetails({
  employeeAvatar,
  employeeDepartment,
  employeeName,
}) {
  return (
    <div>
      <p className="mb-7 text-2xl font-medium">დავალების დეტალები</p>

      <div>
        <Status />

        <Employee
          employeeAvatar={employeeAvatar}
          employeeDepartment={employeeDepartment}
          employeeName={employeeName}
        />

        <DueDate />
      </div>
    </div>
  );
}

function Status() {
  const { data: statuses, isLoading: statusesLoading } = useStatuses();

  return (
    <div className="flex items-center">
      <span className="flex items-center gap-1.5">
        <PieChartIcon />
        სტატუსი
      </span>

      <Dropdown className="w-65" />
    </div>
  );
}

function Employee({ employeeAvatar, employeeName, employeeDepartment }) {
  return (
    <div>
      <span>
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

function DueDate() {
  return (
    <div>
      <span>
        <CalendarIcon />
        დავალების ვადა
      </span>

      <Dropdown />
    </div>
  );
}

export default TaskPageTaskDetails;
