function LoadingOverlay({ message, parentClassName, className }) {
  return (
    <div
      className={`absolute inset-0 z-10 flex items-center justify-center bg-white/50 backdrop-blur-[0.125rem] ${parentClassName}`}
    >
      <p className={`text-purple text-2xl font-medium ${className}`}>
        {message}
      </p>
    </div>
  );
}

export default LoadingOverlay;
