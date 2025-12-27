const PillButton = ({ action, type, name }) => {
  return (
    <button
      type="button"
      onClick={() => {
        action();
      }}
      className={`px-2.5 lg:px-4 py-0.5 lg:py-1 text-sm lg:text-base rounded-full cursor-pointer transition-all duration-300 font-medium ${
        type ? "bg-info text-white" : "bg-white text-muted border border-muted"
      } `}
    >
      {name}
    </button>
  );
};

export default PillButton;
