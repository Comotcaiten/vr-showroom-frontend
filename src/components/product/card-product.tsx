"use client";

import Image from "next/image";
import { Heart, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type CardProductProps = {
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  tags?: string[];
  isSale?: boolean;
  path?: string;
};

export function CardProduct({
  name,
  price,
  oldPrice,
  image,
  tags = [],
  isSale,
  path,
}: CardProductProps) {
  return (
    <Card className="rounded-2xl border bg-white hover:shadow-md transition">
      <CardContent className="p-4 space-y-4">
        {/* IMAGE */}
        
        <a href={path}>
        <div className="relative w-full aspect-square bg-gray-100 rounded-xl overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-contain p-4"
          />

          {isSale && (
            <Badge className="absolute top-2 left-2 bg-red-500 text-white">
              SALE
            </Badge>
          )}
        </div>
        </a>

        {/* NAME */}
        <h3 className="font-semibold text-sm line-clamp-2 mt-2">{name}</h3>

        {/* TAGS */}
        <div className="flex gap-2 flex-wrap">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="text-xs px-2 py-0.5"
            >
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex flex-row items-center justify-between">

        {/* PRICE */}
        <div className="flex items-center gap-2 justify-around">
          <span className="font-bold text-lg">{price.toLocaleString("vi-VN")} VND</span>
          {oldPrice && (
            <span className="text-sm line-through text-gray-400">
              ${oldPrice.toLocaleString("vi-VN")} VND
            </span>
          )}
        

        </div>

        {/* ACTION */}
        <div className="flex items-center justify-end gap-2 pt-2">
          <Button size="icon" variant="ghost">
            <Heart className="w-4 h-4" />
          </Button>
          <Button size="icon" variant="ghost">
            <ShoppingCart className="w-4 h-4" />
          </Button>
        </div>
        </div>
      </CardContent>
    </Card>
  );
}