/* eslint-disable @typescript-eslint/no-explicit-any */
import Footer from "../components/Footer";
import Header from "../components/Header";

const ResultsSearch = () => {
  const products = [
    {
      id: 1,
      mainImage: "/images/1.jpeg",
      name: "Product 1",
      price: 100,
    },
    { id: 2, mainImage: "/images/2.jpeg", name: "Product 2", price: 200 },
    { id: 3, mainImage: "/images/3.jpeg", name: "Product 3", price: 300 },
    { id: 4, mainImage: "/images/4.webp", name: "Product 4", price: 400 },
    {
      id: 1,
      mainImage: "/images/1.jpeg",
      name: "Product 1",
      price: 100,
    },
    { id: 2, mainImage: "/images/2.jpeg", name: "Product 2", price: 200 },
    { id: 3, mainImage: "/images/3.jpeg", name: "Product 3", price: 300 },
    { id: 4, mainImage: "/images/4.webp", name: "Product 4", price: 400 },
    {
      id: 1,
      mainImage: "/images/1.jpeg",
      name: "Product 1",
      price: 100,
    },
    { id: 2, mainImage: "/images/2.jpeg", name: "Product 2", price: 200 },
    { id: 3, mainImage: "/images/3.jpeg", name: "Product 3", price: 300 },
    { id: 4, mainImage: "/images/4.webp", name: "Product 4", price: 400 },
  ];

  return (
    <>
      <Header />
      <div className="container mx-auto pt-32 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
            >
              <img
                className="w-full h-64 object-cover"
                src={product.mainImage}
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
      <Footer />
    </>
  );
};

export default ResultsSearch;
