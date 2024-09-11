import {
  useGetTopSellerProductsQuery,
  useGetTopRatedProductsQuery,
} from "../../features/product/api/productSlice";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Landing from "../components/Landing";
import Offers from "../components/Offers";
import ProductCard from "../components/ProductCard";
import Statistics from "../components/Statistics";

const Home = () => {
  const { data: topSellerData } = useGetTopSellerProductsQuery(undefined);

  const { data: topRatedData } = useGetTopRatedProductsQuery(undefined);

  return (
    <>
      <Header />
      <div className="pt-[84.5px]">
        <Landing />
      </div>
      {/* top selling product */}
      <div className="py-24 bg-slate-100 dark:bg-gray-800">
        <h1 className="text-2xl md:text-4xl font-bold text-center pb-10 dark:text-white">
          Top Selling Products
        </h1>

        {topSellerData && <ProductCard products={topSellerData.products} />}
      </div>
      {/* offers */}
      <div className="py-24 bg-slate-100 dark:bg-gray-800">
        <Offers />
      </div>
      {/* send email */}
      <div className="relative">
        <div className="absolute left-0 top-0 w-full h-full bg-[rgba(0,0,0,0.6)]"></div>
        <div className="absolute left-0 top-0 w-full h-full flex flex-col justify-center items-center gap-y-4 text-white">
          <h1 className="text-2xl md:text-4xl font-bold">
            Get Notified About New Products
          </h1>
          <input
            className="w-[80%] md:w-[40%] p-2 text-black"
            type="text"
            placeholder="Enter your email"
          />
        </div>
        <img
          src="/images/sendmail.jpg"
          className="w-full h-[200px]"
          alt="sendmail.jpg"
        />
      </div>
      {/* top rating product */}
      <div className="py-24 bg-slate-100 dark:bg-gray-800">
        <h1 className="text-2xl md:text-4xl font-bold text-center pb-10 dark:text-white">
          Top Rating Products
        </h1>

        {topRatedData && <ProductCard products={topRatedData.products} />}
      </div>
      {/* statistics */}
      <div className="pb-24 bg-slate-100 dark:bg-gray-800">
        <h1 className="text-center text-2xl md:text-4xl font-bold mb-8 text-gray-800 dark:text-gray-200">
          Statistics
        </h1>
        <Statistics />
      </div>
      {/* footer */}
      <div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
