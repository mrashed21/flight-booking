const ProductDetailsPage = ({ params }) => {
  return (
    <section>
      <h1>Product: {params.slug}</h1>
    </section>
  );
};

export default ProductDetailsPage;
