/* eslint-disable @typescript-eslint/no-explicit-any */
import { Product } from "../../types/type";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";

const ResultSearchPage = () => {
  const location = useLocation();
  const { products } = location.state || { products: [] };

  return (
    <>
      <Header />
      {products.length > 0 ? (
        <div className="container mx-auto pt-32 pb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product: Product) => (
              <div
                key={product.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
              >
                <img
                  className="w-full h-64 object-cover"
                  src={`${import.meta.env.VITE_BASE_URL}/${product.mainImage}`}
                  alt={product.name}
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                  <p className="text-gray-600 mb-4">${product.price}</p>
                  <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>No products found</p>
      )}
      <Footer />
    </>
  );
};

export default ResultSearchPage;
