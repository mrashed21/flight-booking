const Container = ({ children, className }) => {
  return (
    <section className={`max-w-400 w-[95%]  mx-auto  ${className}`}>
      {children}
    </section>
  );
};

export default Container;
