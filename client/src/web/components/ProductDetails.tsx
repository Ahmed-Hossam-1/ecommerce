import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProductDetails = ({
  name,
  price,
  averageRating,
}: {
  name: string;
  price: number;
  averageRating: number;
}) => (
  <div>
    <h2 className="text-lg font-semibold truncate">{name}</h2>
    <div className="flex items-center gap-1 ">
      {Array.from({ length: 5 }).map((_, index) => (
        <FontAwesomeIcon
          key={index}
          icon={faStar}
          className={`${
            index < averageRating ? "text-yellow-500" : "text-gray-300"
          }`}
        />
      ))}
    </div>
    <p className="text-lg text-gray-300">${price}</p>
  </div>
);

export default ProductDetails;
