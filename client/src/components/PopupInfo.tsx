import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const PopupInfo = ({
  setPopupOpen,
}: {
  setPopupOpen: (value: boolean) => void;
}) => {
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    address: "1234 Elm Street, Springfield",
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const toggleOpenViewOrder = () => {
    if (isEditing) {
      setIsEditing(false);
    } else {
      setIsOpen(!isOpen);
    }
  };

  const handleEditProfile = () => {
    if (isOpen) {
      setIsOpen(false);
    }
    setIsEditing(true);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Profile updated");
    setIsEditing(false);
  };

  const orders = [
    { id: "1", date: "2024-08-01", total: "$50.00" },
    { id: "2", date: "2024-08-15", total: "$75.00" },
    { id: "1", date: "2024-08-01", total: "$50.00" },
    { id: "2", date: "2024-08-15", total: "$75.00" },
    { id: "1", date: "2024-08-01", total: "$50.00" },
    { id: "2", date: "2024-08-15", total: "$75.00" },
    { id: "1", date: "2024-08-01", total: "$50.00" },
    { id: "2", date: "2024-08-15", total: "$75.00" },
  ];

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
        {!isEditing ? (
          <div>
            <h2 className="text-2xl font-semibold mb-2 dark:text-white">
              {user.name}
            </h2>
            <p className="text-gray-700 dark:text-white">{user.email}</p>
            <p className="text-gray-700 dark:text-white">{user.address}</p>
            <div className="mt-4">
              <button
                onClick={handleEditProfile}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition mr-2"
              >
                Edit Profile
              </button>
              <button
                onClick={toggleOpenViewOrder}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                {isOpen ? "Hide Orders" : "View Orders"}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6">
            <h2 className="text-2xl font-semibold mb-4 dark:text-white">
              Edit Profile
            </h2>
            <div className="mb-4">
              <label
                className="block text-gray-700 mb-2 dark:text-white"
                htmlFor="name"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                defaultValue={user.name}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 mb-2 dark:text-white"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                defaultValue={user.email}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 mb-2 dark:text-white"
                htmlFor="address"
              >
                Address
              </label>
              <input
                id="address"
                type="text"
                defaultValue={user.address}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition mr-2"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
        {isOpen && !isEditing && (
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
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b hover:bg-gray-50 transition hover:dark:bg-secbgDark800 dark:text-mainTextDark"
                  >
                    <td className="px-4 py-2">{order.id}</td>
                    <td className="px-4 py-2">{order.date}</td>
                    <td className="px-4 py-2">{order.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PopupInfo;
