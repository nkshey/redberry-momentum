import CalendarIcon from "../../ui/icons/CalendarIcon";
import ChevronIcon from "../../ui/icons/ChevronIcon";
import PieChartIcon from "../../ui/icons/PieChartIcon";
import UserIcon from "../../ui/icons/UserIcon";

function TaskPageTaskDetails() {
  return (
    <div>
      <p className="mb-7 text-2xl font-medium">დავალების დეტალები</p>

      <div>
        <div className="flex items-center gap-17.5">
          <div className="flex items-center gap-1.5">
            <PieChartIcon />
            <span>სტატუსი</span>
          </div>

          <div className="flex h-11 w-65 items-center justify-between rounded-[5px] border border-[#CED4DA] px-3.5">
            <span className="font-light">მზად ტესტირებისთვის</span>
            <ChevronIcon />
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <UserIcon />
          <span>თანამშრომელი</span>
        </div>

        <div className="flex items-center gap-1.5">
          <CalendarIcon />
          <span>დავალების ვადა</span>
        </div>
      </div>
    </div>
  );
}

export default TaskPageTaskDetails;
