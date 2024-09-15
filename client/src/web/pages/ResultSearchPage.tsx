import { Product } from "../../types/type";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useLocation, Link } from "react-router-dom";
import { useAppDispatch } from "../../hooks/storeHooks";
import { addToCart } from "../../features/cart/cartSlice";

const ResultSearchPage = () => {
  const location = useLocation();
  const { products } = location.state || { products: [] };

  console.log("products", products);

  const dispatch = useAppDispatch();

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  return (
    <>
      <Header />
      <div className="dark:bg-gray-800 bg-slate-100">
        {products.length > 0 ? (
          <div className="container mx-auto pt-32 pb-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product: Product) => (
                <div
                  key={product.id}
                  className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 dark:bg-gray-700"
                >
                  <Link to={`/product/${product.id}`}>
                    <img
                      className="w-full h-64 object-cover"
                      src={`${import.meta.env.VITE_BASE_URL}/${
                        product.mainImage
                      }`}
                      alt={product.name}
                    />
                  </Link>
                  <div className="dark:text-white p-4">
                    <div>
                      <div className="flex items-start justify-between">
                        <h2 className="text-xl font-semibold mb-2">
                          {product.name}
                        </h2>
                        <p className="text-gray-600 mb-4 dark:text-white">
                          ${product.price}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* <Pagination
              itemsPerPage={itemsPerPage}
              data={products}
              setPage={setCurrentPage}
            /> */}
          </div>
        ) : (
          <p>No products found</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ResultSearchPage;
