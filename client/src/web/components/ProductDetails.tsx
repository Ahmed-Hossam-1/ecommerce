const ProductDetails = ({ name, price }: { name: string; price: number }) => (
  <div>
    <h2 className="text-lg font-semibold">{name}</h2>
    <p className="text-lg pt-1 text-gray-500">${price}</p>
  </div>
);

export default ProductDetails;
