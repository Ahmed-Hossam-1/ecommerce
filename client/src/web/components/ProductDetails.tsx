import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProductDetails = ({ name, price }: { name: string; price: number }) => (
  <div>
    <h2 className="text-lg font-semibold">{name}</h2>
    <p className="text-sm text-gray-500">${price}</p>
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <FontAwesomeIcon
          key={index}
          icon={faStar}
          className="text-yellow-500"
        />
      ))}
    </div>
  </div>
);

export default ProductDetails;
