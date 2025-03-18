function ValidationRequirement({
  showField,
  isSubmitAttempted,
  hasError,
  children,
}) {
  return (
    <span
      className={
        !showField
          ? isSubmitAttempted
            ? "text-red"
            : "text-light-gray"
          : hasError
            ? "text-red"
            : "text-green"
      }
    >
      {children}
    </span>
  );
}

export default ValidationRequirement;
