import { EffectCoverflow, Pagination } from "swiper/modules";
import { useAppDispatch } from "../../hooks/storeHooks";
import { addToCart } from "../../features/cart/cartSlice";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import ProductDetails from "./ProductDetails";
import ProductButton from "./ProductButton";
import { Product } from "../../types/type";

export default function ProductCard({ products }: { products: Product[] }) {
  const dispatch = useAppDispatch();

  const handleAddToCart = (product: Product) => {
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
      {products?.map((product, index) => (
        <SwiperSlide key={index} className="relative group w-[320px] h-[320px]">
          <img
            className="w-full h-full object-cover rounded-md"
            src={`${import.meta.env.VITE_BASE_URL}/${product.mainImage}`}
            alt={product.name}
          />
          <div className="flex justify-between items-center px-4 absolute bottom-0 left-0 w-full bg-[rgba(0,0,0,0.7)] text-white transition-all duration-300 ease-in-out transform translate-y-full group-hover:translate-y-0 group-hover:h-[80px] h-0 overflow-hidden">
            <ProductDetails
              name={product.name}
              price={product.price}
              averageRating={product.averageRating || 0}
            />
            <ProductButton
              id={product.id || ""}
              handleAddToCart={() =>
                handleAddToCart({
                  ...product,
                  quantity: 1,
                  mainImage: product.mainImage || "",
                })
              }
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
