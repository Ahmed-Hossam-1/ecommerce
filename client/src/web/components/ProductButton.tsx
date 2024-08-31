import { Link } from "react-router-dom";

const ProductButton = ({
  handleAddToCart,
  id,
}: {
  handleAddToCart: () => void;
  id: string;
}) => (
  <div className="ml-16">
    <button
      onClick={handleAddToCart}
      className="w-[110px] p-1 mb-2 bg-white text-black shadow hover:bg-gray-300"
    >
      Add to Cart
    </button>
    <Link
      to={`/product/${id}`}
      className="block text-center w-[110px] p-1 bg-white text-black shadow hover:bg-gray-300"
    >
      View Detail
    </Link>
  </div>
);

export default ProductButton;
