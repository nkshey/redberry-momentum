function PageTitle({ className, children }) {
  return (
    <h1 className={`text-[2.125rem] font-semibold ${className}`}>{children}</h1>
  );
}

export default PageTitle;
