import { Prisma } from "@prisma/client";
import ProductItem from "./product-item";

interface ProductListProps {
  products: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
        };
      };
    };
  }>[];
}

const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className="flex gap-4 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
      {products.map((product) => (
        <ProductItem product={product} key={product.id} />
      ))}
    </div>
  );
};

export default ProductList;