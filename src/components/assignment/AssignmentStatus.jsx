function AssignmentStatus({ className, status }) {
  return (
    <h2
      className={`mb-7.5 grid h-13.5 place-content-center rounded-[0.625rem] px-4 text-center text-[1.25rem] font-medium text-white ${className}`}
    >
      {status}
    </h2>
  );
}

export default AssignmentStatus;
