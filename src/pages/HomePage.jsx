import TasksList from "../components/task/TasksList";
import FilterBar from "../components/filter/FilterBar";
import PageTitle from "../components/PageTitle";
import SelectedFilters from "../components/filter/SelectedFilters";

function HomePage() {
  return (
    <>
      <PageTitle className="mb-13">დავალებების გვერდი</PageTitle>

      <section>
        <FilterBar />
        <SelectedFilters />
      </section>

      <TasksList />
    </>
  );
}

export default HomePage;
