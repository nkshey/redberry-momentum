import AssignmentCard from "./AssignmentCard";
import AssignmentStatus from "./AssignmentStatus";

function AssignmentsList() {
  return (
    <ul className="grid grid-cols-4 gap-13">
      <li>
        <AssignmentStatus className="bg-yellow" status="დასაწყები" />
        <AssignmentCard />
      </li>

      <li>
        <AssignmentStatus className="bg-orange" status="პროგრესში" />
        <AssignmentCard />
      </li>

      <li>
        <AssignmentStatus className="bg-pink" status="მზად ტესტირებისთვის " />
        <AssignmentCard />
      </li>

      <li>
        <AssignmentStatus className="bg-blue" status="დასრულებული" />
        <AssignmentCard />
      </li>
    </ul>
  );
}

export default AssignmentsList;
