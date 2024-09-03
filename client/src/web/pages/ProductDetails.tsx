import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faUser } from "@fortawesome/free-solid-svg-icons";
import ProductCard from "../components/ProductCard";
import { useParams } from "react-router-dom";
import {
  useGetProductQuery,
  useGetProductsByCategoryQuery,
} from "../../features/product/api/productSlice";
import {
  useCreateReviewMutation,
  useGetReviewsByProductIdQuery,
} from "../../features/reviews/api/reviewSlice";
import { useAppDispatch } from "../../hooks/storeHooks";
import { addToCart, CartItem } from "../../features/cart/cartSlice";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { productId } = useParams<{ productId: string | undefined }>();
  const { data: productData } = useGetProductQuery({ productId: productId! });
  const { data: categoryData } = useGetProductsByCategoryQuery({
    productByCategoryId: productData?.product?.categoryId || "",
  });
  const { data: reviews, refetch } = useGetReviewsByProductIdQuery({
    productId: productId!,
  });

  const averageRating =
    (reviews?.reviews.reduce((acc, review) => acc + review.rating, 0) ?? 0) /
    (reviews?.reviews.length ?? 1);
  console.log("averageRating", averageRating);

  const [createReview] = useCreateReviewMutation();

  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleCreateReview = async () => {
    try {
      const res = await createReview({
        productId: productId!,
        rating,
        review: reviewText,
      });
      res?.data && (await refetch());
      res?.data && setRating(0);
      res?.data && setReviewText("");
      res?.data && toast.success("Review created successfully");

      if (res.error) {
        console.error("Failed to create review:", res);
        toast.error(res?.error?.data.error);
      }
    } catch (error) {
      console.error("Failed to create review:", error);
    }
  };

  const dispatch = useAppDispatch();

  const handleAddToCart = (product: CartItem) => {
    dispatch(addToCart(product));
  };

  return (
    <>
      <Header />
      <div className="dark:bg-gray-800">
        {/* Product details */}
        <div className="container w-full flex justify-center flex-col gap-y-10 md:flex-row pt-[130px] pb-[45px]">
          <div className="w-full md:w-1/2">
            <Swiper
              effect={"cards"}
              grabCursor={true}
              modules={[EffectCards]}
              className="mySwiper w-[300px] h-[300px]"
            >
              {productData?.product?.images
                ?.split(",")
                .map((product, index) => (
                  <SwiperSlide
                    key={index}
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
          <div className="w-full md:w-1/2">
            <h1 className="text-4xl font-bold mb-3 dark:text-white">
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
                      className={`${
                        index < averageRating
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="dark:text-white">
                  Price: {productData?.product?.price}$
                </p>
              </div>
              <button
                onClick={() =>
                  handleAddToCart({
                    id: productData?.product?.id || "",
                    name: productData?.product?.name || "",
                    price: productData?.product?.price || 0,
                    quantity: 1,
                    mainImage: productData?.product?.mainImage || "",
                  })
                }
                className="w-[110px] p-1 mb-2 bg-white text-black shadow hover:bg-gray-300"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
        {/* Related Product */}
        <div className="bg-slate-50 dark:bg-gray-900 py-14">
          <h2 className="text-4xl font-bold text-center pb-10 dark:text-white">
            Related Products
          </h2>
          <ProductCard products={categoryData?.products || []} />
        </div>
        {/* Review Section */}
        <div className="w-full container">
          <h2 className="text-4xl font-bold text-center py-10 dark:text-white">
            Reviews
          </h2>
          <div className="w-full md:w-[50%]">
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="w-full p-2 border-2 border-gray-300 rounded-md mb-3"
              placeholder="Write a review..."
            />
            <div className="flex items-center gap-1 mb-3">
              <span className="dark:text-white">Enter your rating: </span>
              <div className="relative flex">
                {Array.from({ length: 5 }).map((_, index) => (
                  <FontAwesomeIcon
                    key={index}
                    icon={faStar}
                    className={`cursor-pointer transition-colors duration-200 ease-in-out ${
                      index < (hoverRating || rating)
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }`}
                    onClick={() => setRating(index + 1)}
                    onMouseEnter={() => setHoverRating(index + 1)}
                    onMouseLeave={() => setHoverRating(0)}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={handleCreateReview}
              className="w-[110px] p-1 mb-2 bg-white text-black shadow hover:bg-gray-300"
            >
              Submit
            </button>
          </div>
          {reviews?.reviews.map((review) => (
            <>
              <hr className="w-full mx-auto my-10" />
              <div key={review.id} className="w-full md:w-[50%]">
                <div className="flex items-start gap-2">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="text-gray-700 dark:text-gray-500 bg-slate-100 p-3 rounded-full"
                  />
                  <div>
                    <p className="dark:text-white">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <FontAwesomeIcon
                        key={index}
                        icon={faStar}
                        className={`${
                          index < review.rating
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-lg text-[#777] mb-3 ml-11 dark:text-white">
                  {review.review}
                </p>
                <hr className="py-10" />
              </div>
            </>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetails;
