import { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import CartCard from "../components/CartCard";
import { removeFromCart } from "../../features/cart/cartSlice";
import { useCreatePaymentMutation } from "../../features/payment/api/paymentSlice";
import { totalAmount } from "../../features/cart/cartSlice";
import { useCreateOrderMutation } from "../../features/order/api/orderSlice";
import { toast } from "react-toastify";

const PaymentPage = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const [createPayment] = useCreatePaymentMutation();
  const [createOrder] = useCreateOrderMutation();

  const handleRemoveFromCart = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    if (!stripe || !elements) {
      setError("Stripe has not loaded properly.");
      setIsProcessing(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setError("Card information is not available.");
      setIsProcessing(false);
      return;
    }

    const items = cartItems.map((item) => ({
      productId: "4d74ecc8-fb6c-4dba-adf9-d803f2e1ea85",
      quantity: +item.quantity,
      price: +item.price,
    }));

    try {
      const res = await createPayment({
        amount: totalAmount(cartItems),
      }).unwrap();
      const clientSecret = res?.clientSecret;

      if (!clientSecret) {
        setError("Failed to retrieve client secret.");
        setIsProcessing(false);
        return;
      }

      const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (payload.error) {
        setError(`Payment failed: ${payload.error.message}`);
        toast.error(payload.error.message);
      } else {
        console.log("Payment successful!", payload.paymentIntent);
        toast.success("Payment successful!");
        setError(null);

        const res = await createOrder({
          totalAmount: +totalAmount(cartItems),
          items,
        });
        console.log("Order created", res);
      }
    } catch (err) {
      setError("An unexpected error occurred.");
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Header />
      <div className="w-full container pt-32 pb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Payment Page</h1>
        {/* Review address */}
        <div className="flex items-start gap-2 text-xl font-semibold text-gray-800">
          <div>Delivery Address:</div>
          <div className="text-[#777] text-sm mt-1">
            <h3>ahmed@gmail.com</h3>
            <h4>Fake City, Fake Country</h4>
          </div>
        </div>
        <hr className="my-10" />
        {/* Review product */}
        <div className="flex gap-5 flex-wrap justify-start">
          {cartItems.map((item) => (
            <CartCard
              key={item.id}
              item={item}
              handleRemoveFromCart={handleRemoveFromCart}
            />
          ))}
        </div>
        <hr className="my-10" />
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-8">
            Payment Method
          </h2>
          <form onSubmit={handleSubmit}>
            <CardElement onChange={() => setError(null)} />
            {error && <div className="text-red-500 mt-2">{error}</div>}
            <span>Total: {totalAmount(cartItems).toFixed(2)}$</span>
            <button
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Pay Now"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PaymentPage;
