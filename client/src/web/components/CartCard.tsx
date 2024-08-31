import { FC } from "react";

interface CartCardProps {
  item: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    mainImage: string;
  };
  handleRemoveFromCart: (id: string) => void;
}

const CartCard: FC<CartCardProps> = ({ item, handleRemoveFromCart }) => {
  return (
    <div
      key={item.id}
      className="flex items-center bg-white p-4 rounded-lg shadow-md transition duration-300 hover:shadow-lg"
    >
      <img
        src={`${import.meta.env.VITE_BASE_URL}/${item.mainImage}`}
        alt={item.name}
        className="w-24 h-24 object-cover rounded-md"
      />
      <div className="ml-4 flex-1">
        <h2 className="text-xl font-semibold text-gray-800">{item.name}</h2>
        <p className="text-gray-600">Price: ${item.price}</p>
        <p className="text-gray-600">Quantity: {item.quantity}</p>
      </div>
      <div className="flex flex-col justify-between items-end">
        <button
          onClick={() => handleRemoveFromCart(item.id)}
          className="bg-red-500 text-white px-4 py-2 mb-3 rounded-lg hover:bg-red-600 transition"
        >
          Remove
        </button>
        <p className="text-xl font-semibold text-gray-800">
          Total: ${item.price * item.quantity}
        </p>
      </div>
    </div>
  );
};

export default CartCard;
