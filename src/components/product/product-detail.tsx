"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Heart } from "lucide-react";

/* ================= TYPE ================= */

type ProductDetail = {
  _id: string;
  name: string;
  price: number;
  images?: string;
  brand?: { name: string };
  category?: { name: string };
  quantity: number;
  description?: string;
};

type ProductDisplayData = {
  ID: string;
  Name: string;
  Price: string;
  Brand: string;
  Category: string;
  Quantity: number;
};

/* ================= HELPER ================= */

const formatVND = (price: number) =>
  price.toLocaleString("vi-VN") + " ₫";

const toDisplayData = (product: ProductDetail): ProductDisplayData => ({
  ID: product._id,
  Name: product.name,
  Price: formatVND(product.price),
  Brand: product.brand?.name || "Unknown",
  Category: product.category?.name || "Unknown",
  Quantity: product.quantity,
});

/* ================= TABLE ================= */

const TableProductDetail = ({ product }: { product: ProductDetail }) => {
  const data = toDisplayData(product);

  const labels: Record<keyof ProductDisplayData, string> = {
    ID: "Mã sản phẩm",
    Name: "Tên",
    Price: "Giá",
    Brand: "Thương hiệu",
    Category: "Danh mục",
    Quantity: "Số lượng",
  };

  return (
    <div className="border rounded-xl">
      <Table>
        <TableBody>
          {Object.entries(data).map(([key, value]) => (
            <TableRow key={key}>
              <TableCell className="font-medium w-[40%]">
                {labels[key as keyof ProductDisplayData]}
              </TableCell>
              <TableCell>{value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

/* ================= MAIN ================= */

export const ProductDetail = ({ product }: { product: ProductDetail }) => {
  const handleAddToCart = () => {
    console.log("Add to cart", product);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">
      
      {/* TOP */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* IMAGE */}
        <Card className="overflow-hidden">
          <div className="relative w-full h-[350px]">
            <Image
              src={product.images || "/placeholder.png"}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
        </Card>

        {/* INFO */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">{product.name}</h1>

          <p className="text-sm text-gray-500">
            Mã sản phẩm: {product._id}
          </p>

          <p className="text-2xl font-semibold text-red-500">
            {formatVND(product.price)}
          </p>

          <div className="text-sm space-y-1 text-gray-600">
            <p>Thương hiệu: {product.brand?.name || "Unknown"}</p>
            <p>Danh mục: {product.category?.name || "Unknown"}</p>
          </div>

          {/* ACTION */}
          {product.quantity > 0 ? (
            <div className="space-y-3 pt-4">
              <Button
                className="w-full text-base"
                onClick={handleAddToCart}
              >
                Buy Now
              </Button>

              <Button
                variant="outline"
                className="w-full text-base"
                onClick={handleAddToCart}
              >
                <Heart className="w-4 h-4 mr-2" />
                Add to cart
              </Button>
            </div>
          ) : (
            <div className="border border-dashed p-4 text-center rounded-lg">
              <p className="text-lg font-semibold text-gray-500">
                Sản phẩm đã hết
              </p>
            </div>
          )}
        </div>
      </div>

      {/* BOTTOM */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* DESCRIPTION */}
        <div className="md:col-span-2 space-y-2 bg-blue-800">
          <h2 className="text-xl font-semibold">
            Mô tả sản phẩm
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* TABLE */}
        <div className="space-y-2 bg-amber-700">
          <h2 className="text-xl font-semibold">
            Thông tin chi tiết
          </h2>
          <TableProductDetail product={product} />
        </div>
      </div>
    </div>
  );
};