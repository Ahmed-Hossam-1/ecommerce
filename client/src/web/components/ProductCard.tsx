import { EffectCoverflow, Pagination } from "swiper/modules";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppDispatch } from "../../hooks/storeHooks";
import { addToCart } from "../../features/cart/cartSlice";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
const products = [
  {
    id: 1,
    image: "/images/1.jpeg",
    name: "Product 1",
    price: 100,
  },
  { id: 2, image: "/images/2.jpeg", name: "Product 2", price: 200 },
  { id: 3, image: "/images/3.jpeg", name: "Product 3", price: 300 },
  { id: 4, image: "/images/4.webp", name: "Product 4", price: 400 },
];

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

const ProductButtons = ({
  handleAddToCart,
  id,
}: {
  handleAddToCart: () => void;
  id: number;
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

export default function ProductCard() {
  const dispatch = useAppDispatch();

  const handleAddToCart = (product: {
    id: number;
    image: string;
    name: string;
    price: number;
    quantity: number;
  }) => {
    dispatch(addToCart(product));
  };
  return (
    <Swiper
      effect={"coverflow"}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={"auto"}
      coverflowEffect={{
        rotate: 50,
        stretch: 1,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }}
      pagination={{ clickable: true }}
      modules={[EffectCoverflow, Pagination]}
      className="mySwiper w-full"
    >
      {products.map((product) => (
        <SwiperSlide
          key={product.id}
          className="relative group w-[320px] h-[320px]"
        >
          <img
            className="w-full h-full object-cover rounded-md"
            src={product.image}
            alt={product.name}
          />
          <div className="flex justify-between items-center px-4 absolute bottom-0 left-0 w-full bg-[rgba(0,0,0,0.7)] text-white transition-all duration-300 ease-in-out transform translate-y-full group-hover:translate-y-0 group-hover:h-[80px] h-0 overflow-hidden">
            <ProductDetails name={product.name} price={product.price} />
            <ProductButtons
              id={product.id}
              handleAddToCart={() =>
                handleAddToCart({ ...product, quantity: 1 })
              }
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
