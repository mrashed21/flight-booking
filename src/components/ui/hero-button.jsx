import Image from "next/image";

const HeroButton = ({ action, type, activeImage, inActiveImage, name }) => {
  return (
    <button
      type="button"
      onClick={() => {
        action();
      }}
      className={`flex cursor-pointer items-center justify-center gap-1 rounded-t-md px-2 py-1 text-lg font-medium transition-all duration-300 lg:px-5 lg:py-1.5 ${
        type ? "text-warning bg-white" : "bg-warning text-white"
      } `}
    >
      {type ? (
        <Image
          width={200}
          height={200}
          src={activeImage}
          alt={name}
          className="h-5 w-7 lg:h-6 lg:w-8"
        />
      ) : (
        <Image
          width={200}
          height={200}
          src={inActiveImage}
          alt={name}
          className="h-5 w-7 lg:h-6 lg:w-8"
        />
      )}{" "}
      {name}
    </button>
  );
};

export default HeroButton;
