function Loader({ className }) {
  return (
    <div className={`grid place-content-center ${className}`}>
      <div className="border-very-light-gray border-t-purple h-10 w-10 animate-spin rounded-full border-4"></div>
    </div>
  );
}

export default Loader;
