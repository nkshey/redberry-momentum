import AddTaskForm from "../components/AddTaskForm";
import PageTitle from "../components/PageTitle";

function AddTaskPage() {
  return (
    <section className="pb-17.5">
      <PageTitle className="mb-6">შექმენი ახალი დავალება</PageTitle>
      <AddTaskForm />
    </section>
  );
}

export default AddTaskPage;
