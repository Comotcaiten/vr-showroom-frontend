import { CardProduct } from "./card-product";

type Product = {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  tags?: string[];
  isSale?: boolean;
};

export function ProductGrid({ products, path }: { products: Product[], path: string }) {
  return (
    <div className="
      grid gap-6
      grid-cols-1 
      sm:grid-cols-2 
      md:grid-cols-3 
      lg:grid-cols-4
    ">
      {products.map((item) => (
        <CardProduct key={item.id} {...item} path={`${path}/${item.id}`}/>
      ))}
    </div>
  );
}