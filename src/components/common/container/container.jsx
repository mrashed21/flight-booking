const Container = ({ children, className }) => {
  return (
    <section className={`mx-auto w-[98%] max-w-400 lg:w-[95%] ${className}`}>
      {children}
    </section>
  );
};

export default Container;
