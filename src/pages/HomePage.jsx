import TasksList from "../components/task/TasksList";
import FilterBar from "../components/filter/FilterBar";
import PageTitle from "../components/PageTitle";

function HomePage() {
  return (
    <section>
      <PageTitle className="mb-13">დავალებების გვერდი</PageTitle>
      <FilterBar />
      <TasksList />
    </section>
  );
}

export default HomePage;
