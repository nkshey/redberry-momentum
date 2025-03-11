import AssignmentsList from "../components/assignment/AssignmentsList";
import FilterPanel from "../components/filter/FilterPanel";
import PageTitle from "../components/PageTitle";

function HomePage() {
  return (
    <section>
      <PageTitle className="mb-13">დავალებების გვერდი</PageTitle>
      <FilterPanel />
      <AssignmentsList />
    </section>
  );
}

export default HomePage;
