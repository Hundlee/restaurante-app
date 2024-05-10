"use client";

import DeliveryInfo from "@/app/_components/delivery-info";
import DiscountBadge from "@/app/_components/discount-badge";
import ProductList from "@/app/_components/product-list";
import { Button } from "@/app/_components/ui/button";
import { Card } from "@/app/_components/ui/card";
import {
  calculateProductTotalPrice,
  formatCurrency,
} from "@/app/_helpers/price";
import { Prisma } from "@prisma/client";
import {
  BikeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  TimerIcon,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>;
  complemantaryProducts: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>[];
}

const ProductDetails = ({
  product,
  complemantaryProducts,
}: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncreaseQuatityClick = () =>
    setQuantity((currentState) => currentState + 1);
  const handleDecreaseQuatityClick = () =>
    setQuantity((currentState) => {
      if (currentState === 1) {
        return 1;
      }

      return currentState - 1;
    });

  return (
    <div className="py-5">
      {/* IMAGEM DO PRODUTO  */}

      <div className="flex items-center gap-2 px-5">
        <div className="relative h-6 w-6">
          <Image
            src={product.restaurant.imageUrl}
            alt={product.restaurant.name}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <span className=" text-xs text-muted-foreground">
          {product.restaurant.name}
        </span>
      </div>

      {/* NOME DO PRODUTO */}

      <h1 className="mb-2 px-5 text-xl font-semibold">{product.name}</h1>

      {/* NOME DO PRODUTO E QUANTIDADE */}

      <div className="flex items-center justify-between px-5">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">
              {formatCurrency(calculateProductTotalPrice(product))}
            </h2>
            {product.discountPercentage > 0 && (
              <DiscountBadge product={product} />
            )}
          </div>

          {product.discountPercentage > 0 && (
            <p className="text-xs text-muted-foreground">
              De: {formatCurrency(Number(product.price))}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2 text-center">
          <Button
            size="icon"
            variant="ghost"
            className="border border-solid border-muted-foreground"
            onClick={handleDecreaseQuatityClick}
          >
            <ChevronLeftIcon />
          </Button>
          <span className="w-4">{quantity}</span>
          <Button size="icon" onClick={handleIncreaseQuatityClick}>
            <ChevronRightIcon />
          </Button>
        </div>
      </div>

      {/* INFORMAÇÕES DO DELIVERY */}

      <div className="px-5 pt-6">
        <DeliveryInfo restaurant={product.restaurant} />
      </div>

      {/* INFORMAÇÕES DO RESTAURANTE */}

      <div className="mt-6 space-y-2 px-5">
        <h3 className="font-semibold">Sobre</h3>

        <p className="text-sm text-muted-foreground">{product.description}</p>
      </div>

      {/* LISTA DE SUCOS */}

      <div className="mt-6 space-y-2 px-5">
        <h3 className="font-semibold">Sucos</h3>
        <ProductList products={complemantaryProducts} />
      </div>

      {/* BOTÃO PARA ADICIONAR A SACOLA */}

      <div className="mt-6 px-5">
        <Button className="w-full font-semibold">Adicionar à sacola</Button>
      </div>
    </div>
  );
};

export default ProductDetails;
