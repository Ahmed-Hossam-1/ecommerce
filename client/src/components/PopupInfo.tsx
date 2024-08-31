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
      setIsEditing(false); // Close the edit form if it's open
    } else {
      setIsOpen(!isOpen); // Toggle order history visibility
    }
  };

  const handleEditProfile = () => {
    if (isOpen) {
      setIsOpen(false); // Close order history if it's open
    }
    setIsEditing(true); // Open the edit profile form
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Add your submit logic here, such as sending data to the backend
    // For now, just logging the form data
    console.log("Profile updated");
    setIsEditing(false); // Close the edit profile form after submission
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
      <div className="bg-white w-11/12 md:w-1/2 h-auto max-h-[80vh] overflow-y-auto shadow-lg rounded-lg p-6 border border-gray-200 relative">
        <button
          onClick={() => setPopupOpen(false)}
          className="absolute top-2 right-2 text-gray-700 hover:text-gray-900 transition"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
        {!isEditing ? (
          <div>
            <h2 className="text-2xl font-semibold mb-2">{user.name}</h2>
            <p className="text-gray-700">{user.email}</p>
            <p className="text-gray-700">{user.address}</p>
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
            <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="name">
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
              <label className="block text-gray-700 mb-2" htmlFor="email">
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
              <label className="block text-gray-700 mb-2" htmlFor="address">
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
          <div className="mt-6 h-[300px] overflow-y-auto bg-white shadow-lg rounded-lg border border-gray-200 p-4">
            <h2 className="text-2xl font-semibold mb-4">Order History</h2>
            <table className="w-full border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left text-gray-600">
                    Order ID
                  </th>
                  <th className="px-4 py-2 text-left text-gray-600">Date</th>
                  <th className="px-4 py-2 text-left text-gray-600">Total</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b hover:bg-gray-50 transition"
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
