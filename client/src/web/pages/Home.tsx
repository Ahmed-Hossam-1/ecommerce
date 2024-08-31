import Footer from "../components/Footer";
import Header from "../components/Header";
import Landing from "../components/Landing";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const products = [
    {
      id: 1,
      name: "Product 1",
      price: 100,
      mainImage: "product1.jpg",
    },
    {
      id: 2,
      name: "Product 2",
      price: 200,
      mainImage: "product2.jpg",
    },
    {
      id: 3,
      name: "Product 3",
      price: 300,
      mainImage: "product3.jpg",
    },
    {
      id: 4,
      name: "Product 4",
      price: 400,
      mainImage: "product4.jpg",
    },
  ];

  return (
    <>
      <Header />
      <div className="pt-[84.5px]">
        <Landing />
      </div>
      <div className="py-10">
        <h1 className="text-4xl font-bold text-center my-8">Category 1</h1>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
