/* eslint-disable @typescript-eslint/no-explicit-any */
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";
// import required modules
import { EffectCards } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faUser } from "@fortawesome/free-solid-svg-icons";
import ProductCard from "../components/ProductCard";
import { useParams } from "react-router-dom";
import {
  useGetProductQuery,
  useGetProductsByCategoryQuery,
} from "../../features/product/api/productSlice";
const ProductDetails = () => {
  const { productId } = useParams<{ productId: string | undefined }>();
  const { data: productData } = useGetProductQuery({ productId: productId! });
  console.log(productData);

  const { data: categoryData } = useGetProductsByCategoryQuery({
    productByCategoryId: productData?.product?.categoryId || "",
  });

  console.log("categoryData: ", categoryData);

  return (
    <>
      <Header />
      <div className="w-full flex justify-center flex-wrap pt-[130px] pb-[45px]">
        <div className="w-[40%]">
          <Swiper
            effect={"cards"}
            grabCursor={true}
            modules={[EffectCards]}
            className="mySwiper w-[300px] h-[300px]"
          >
            {productData?.product?.images?.split(",").map((product) => (
              <SwiperSlide
                key={product}
                className="relative w-[300px] h-[300px]"
              >
                <img
                  className="w-full h-full object-cover rounded-md"
                  src={`${import.meta.env.VITE_BASE_URL}/${product}`}
                  alt="product"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="w-[50%]">
          <h1 className="text-4xl font-bold mb-3">
            {productData?.product?.name}
          </h1>
          <p className="text-lg text-[#777] mb-3">
            Description: {productData?.product?.description}
          </p>
          <hr />
          <div className="w-full flex justify-between items-center py-4">
            <div>
              <div className="flex items-center gap-1 mb-2">
                {Array.from({ length: 5 }).map((_, index) => (
                  <FontAwesomeIcon
                    key={index}
                    icon={faStar}
                    className="text-yellow-500"
                  />
                ))}
              </div>
              <p>Price: {productData?.product?.price}$</p>
            </div>
            <button className="w-[110px] p-1 mb-2 bg-white text-black shadow hover:bg-gray-300">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <div className="bg-slate-50 py-14">
        <h2 className="text-4xl font-bold text-center  pb-10">
          Related Products
        </h2>
        {categoryData?.products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {/* Review Section */}
      <div>
        <h2 className="text-4xl font-bold text-center py-10">Reviews</h2>
        <div className="w-full container">
          <div className="w-[50%]">
            <textarea
              className="w-full p-2 border-2 border-gray-300 rounded-md mb-3"
              placeholder="Write a review..."
            ></textarea>
            <button className="w-[110px] p-1 mb-2 bg-white text-black shadow hover:bg-gray-300">
              Submit
            </button>
          </div>
        </div>
        <hr className="w-[60%] mx-auto my-10" />
        <div className="w-full container">
          <div className="w-[50%]">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon
                icon={faUser}
                className="text-gray-700 dark:text-gray-500 bg-slate-100 p-3 rounded-full"
              />
              <div>
                <h3 className="text-2xl font-semibold">John Doe</h3>
                <p>12/12/2021</p>
              </div>
            </div>
            <div className="flex items-center gap-1 mb-2 ml-11">
              {Array.from({ length: 5 }).map((_, index) => (
                <FontAwesomeIcon
                  key={index}
                  icon={faStar}
                  className="text-yellow-500"
                />
              ))}
            </div>
            <p className="text-lg text-[#777] mb-3  ml-11">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
              modi sint ipsam ipsa totam vitae nam doloremque provident fuga
              impedit quaerat placeat, ut voluptatem. Tenetur reiciendis
              voluptatem sunt facere maiores.
            </p>
            <hr />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetails;
