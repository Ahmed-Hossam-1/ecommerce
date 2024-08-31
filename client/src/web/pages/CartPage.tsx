/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  clearCart,
  removeFromCart,
  totalAmount,
} from "../../features/cart/cartSlice";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import Footer from "../components/Footer";
import Header from "../components/Header";
import CartCard from "../components/CartCard";
import CustomDashInput from "../../dashboard/components/CustomDashInput";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addressSchema } from "../../utils/validations";
import { useNavigate } from "react-router-dom";
import {
  useAddAddressMutation,
  useGetAddressByUserIdQuery,
  useUpdateAddressMutation,
} from "../../features/address/api/addressSlice";

const CartPage = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const nav = useNavigate();

  const dispatch = useAppDispatch();

  const [addAddress] = useAddAddressMutation();
  const { data: addressData } = useGetAddressByUserIdQuery();
  const [updateAddress] = useUpdateAddressMutation();

  const handleRemoveFromCart = (id: number) => {
    dispatch(removeFromCart(id));
  };
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  type IaddressSchema = z.infer<typeof addressSchema>;
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IaddressSchema>({
    mode: "onChange",
    resolver: zodResolver(addressSchema),
  });

  useEffect(() => {
    if (addressData?.address) {
      reset({
        street: addressData.address.street,
        city: addressData.address.city,
        state: addressData.address.state,
        country: addressData.address.country,
        phone: addressData.address.phone,
      });
    }
  }, [addressData]);

  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const onSubmit: SubmitHandler<IaddressSchema> = async (data) => {
    if (addressData?.address) {
      await updateAddress({ ...data, id: addressData.address.id });
      toggleModal();
    } else {
      await addAddress(data);
    }
  };

  return (
    <>
      <Header />
      <div className="w-full flex justify-between items-start pt-[150px] pb-[65px] px-6 lg:px-24">
        <div className="w-[60%]">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">
              Shopping Cart
            </h1>

            {cartItems.length > 0 && (
              <button
                onClick={handleClearCart}
                className="text-sm text-red-500 hover:underline"
              >
                Clear Cart
              </button>
            )}
          </div>

          <div className="flex flex-col gap-y-4">
            {cartItems.length === 0 ? (
              <p className="text-lg text-gray-600">Your cart is empty</p>
            ) : (
              cartItems.map((item) => (
                <CartCard
                  key={item.id}
                  item={item}
                  handleRemoveFromCart={handleRemoveFromCart}
                />
              ))
            )}
          </div>
        </div>
        <div className="w-[35%] bg-gray-100 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Order Summary
          </h2>
          <span className="text-lg text-gray-800 mb-6">
            Total: {totalAmount(cartItems).toFixed(2)}$
          </span>
          {/* Adress */}
          {addressData?.address ? (
            isOpen ? (
              <div className="w-full">
                <h2 className="text-xl font-semibold text-gray-800 mb-1">
                  Add your address:
                </h2>
                <form
                  className="flex flex-col gap-y-4"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <CustomDashInput
                    id="street"
                    register={register}
                    errors={errors}
                    type="text"
                    placeholder="Enter your street"
                    label="street"
                  />

                  <CustomDashInput
                    id="city"
                    register={register}
                    errors={errors}
                    type="text"
                    placeholder="Enter your city"
                    label="city"
                  />

                  <CustomDashInput
                    id="state"
                    register={register}
                    errors={errors}
                    type="text"
                    placeholder="Enter your state"
                    label="state"
                  />

                  <CustomDashInput
                    id="country"
                    register={register}
                    errors={errors}
                    type="text"
                    placeholder="Enter your country"
                    label="country"
                  />

                  <CustomDashInput
                    id="phone"
                    register={register}
                    errors={errors}
                    type="text"
                    placeholder="Enter your phone"
                    label="phone"
                  />
                  <div className="mt-4">
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition mr-2"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={toggleModal}
                      className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-1">
                      Your Address:
                    </h2>
                    <p className="text-gray-600">
                      {addressData.address.street}, {addressData.address.city},{" "}
                      {addressData.address.state}, {addressData.address.country}
                    </p>
                    <p className="text-gray-600">{addressData.address.phone}</p>
                  </div>
                  {/* edit */}
                  <button
                    onClick={toggleModal}
                    className="text-sm text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                </div>
                <button
                  disabled={cartItems.length === 0}
                  onClick={() => nav("/payment")}
                  className={`w-full bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition mt-4 ${
                    cartItems.length === 0 && "opacity-50 cursor-not-allowed"
                  }`}
                >
                  Proceed to Checkout
                </button>
              </>
            )
          ) : (
            <div className="w-full">
              <h2 className="text-xl font-semibold text-gray-800 mb-1">
                Add your address:
              </h2>
              <form
                className="flex flex-col gap-y-4"
                onSubmit={handleSubmit(onSubmit)}
              >
                <CustomDashInput
                  id="street"
                  register={register}
                  errors={errors}
                  type="text"
                  placeholder="Enter your street"
                  label="street"
                />

                <CustomDashInput
                  id="city"
                  register={register}
                  errors={errors}
                  type="text"
                  placeholder="Enter your city"
                  label="city"
                />

                <CustomDashInput
                  id="state"
                  register={register}
                  errors={errors}
                  type="text"
                  placeholder="Enter your state"
                  label="state"
                />

                <CustomDashInput
                  id="country"
                  register={register}
                  errors={errors}
                  type="text"
                  placeholder="Enter your country"
                  label="country"
                />

                <CustomDashInput
                  id="phone"
                  register={register}
                  errors={errors}
                  type="text"
                  placeholder="Enter your phone"
                  label="phone"
                />
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition"
                >
                  add Address
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
