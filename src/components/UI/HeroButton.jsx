const HeroButton = ({ action, type, activeImage, inActiveImage, name }) => {
  return (
    <button
      type="button"
      onClick={() => {
        action();
      }}
      className={`px-5 py-1.5 rounded-t-md text-lg font-medium flex items-center justify-center gap-1 cursor-pointer transition-all duration-300 ${
        type ? "bg-white text-warning" : "bg-warning text-white "
      } `}
    >
      {type ? (
        <img src={activeImage} alt={name} className="w-8 h-6" />
      ) : (
        <img src={inActiveImage} alt={name} className="w-8 h-6" />
      )}{" "}
      {name}
    </button>
  );
};

export default HeroButton;
