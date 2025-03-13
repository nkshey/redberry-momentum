import TasksList from "../components/task/TasksList";
import FilterBar from "../components/filter/FilterBar";
import PageTitle from "../components/PageTitle";
import SelectedFilters from "../components/filter/SelectedFilters";

function HomePage() {
  return (
    <section>
      <PageTitle className="mb-13">დავალებების გვერდი</PageTitle>

      <div>
        <FilterBar />
        <SelectedFilters />
      </div>

      <TasksList />
    </section>
  );
}

export default HomePage;
