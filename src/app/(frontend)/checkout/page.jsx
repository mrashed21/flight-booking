import Container from "@/components/common/Container/Container";
import CheckoutSummary from "@/components/frontend/Checkout/CheckoutSummary";
import PaymentForm from "@/components/frontend/Checkout/PaymentForm";

const CheckoutPage = () => {
  return (
    <section className="bg-surface py-10">
      <Container>
        <div className="px-4">
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
              Checkout
            </h1>
            <p className="text-muted mt-1 text-sm">
              Complete your booking — you&apos;re almost there!
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left — Payment Form */}
            <div className="lg:col-span-2">
              <PaymentForm />
            </div>

            {/* Right — Order Summary */}
            <div className="lg:col-span-1">
              <CheckoutSummary />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CheckoutPage;
