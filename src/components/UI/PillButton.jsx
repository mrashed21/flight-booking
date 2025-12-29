const PillButton = ({ action, type, name, className="" }) => {
  return (
    <button
      type="button"
      onClick={() => {
        action();
      }}
      className={`cursor-pointer rounded-full px-2.5 py-0.5 text-sm font-medium transition-all duration-300 lg:px-4 lg:py-1 lg:text-base ${
        type ? "bg-info text-white" : "text-muted border-muted border"
      } ${className}`}
    >
      {name}
    </button>
  );
};

export default PillButton;
