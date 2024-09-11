import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useGetOrderByUserIdQuery } from "../features/order/api/orderSlice";
import { useCurrentUserQuery } from "../features/users/api/userSlice";

const PopupInfo = ({
  setPopupOpen,
}: {
  setPopupOpen: (value: boolean) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpenViewOrder = () => {
    setIsOpen(!isOpen);
  };

  const { data: orderData } = useGetOrderByUserIdQuery();

  const { data: currentUser } = useCurrentUserQuery();

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-20">
      <div className="bg-mainBackground w-11/12 md:w-1/2 h-auto max-h-[80vh] overflow-y-auto shadow-lg rounded-lg p-6 border border-gray-200 relative dark:bg-thirdbgDark700">
        <button
          onClick={() => setPopupOpen(false)}
          className="absolute top-2 right-3"
        >
          <FontAwesomeIcon
            className="dark:text-white text-gray-700"
            icon={faTimes}
          />
        </button>
        <div>
          <h2 className="text-2xl font-semibold mb-2 dark:text-white">
            {currentUser?.user.name}
          </h2>
          <p className="text-gray-700 dark:text-white">
            {currentUser?.user.email}
          </p>
          <button
            onClick={toggleOpenViewOrder}
            className="bg-blue-500 mt-4 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            {isOpen ? "Hide Orders" : "View Orders"}
          </button>
        </div>
        {isOpen && (
          <div className="mt-6 h-[300px] overflow-y-auto bg-white shadow-lg rounded-lg border border-gray-200 p-4 dark:bg-thirdbgDark700">
            <h2 className="text-2xl font-semibold mb-4 dark:text-white">
              Order History
            </h2>
            <table className="w-full border-collapse">
              <thead className="bg-gray-100 dark:bg-secbgDark800 ">
                <tr>
                  <th className="px-4 py-2 text-left text-gray-600 dark:text-mainTextDark ">
                    Order ID
                  </th>
                  <th className="px-4 py-2 text-left text-gray-600 dark:text-mainTextDark">
                    Date
                  </th>
                  <th className="px-4 py-2 text-left text-gray-600 dark:text-mainTextDark">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {orderData?.orders.length > 0 ? (
                  orderData?.orders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b hover:bg-gray-50 transition hover:dark:bg-secbgDark800 dark:text-mainTextDark"
                    >
                      <td className="px-4 py-2">{order.id}</td>
                      <td className="px-4 py-2">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2">{order.totalAmount}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={3}
                      className="text-center dark:text-white pt-5"
                    >
                      No orders found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PopupInfo;
