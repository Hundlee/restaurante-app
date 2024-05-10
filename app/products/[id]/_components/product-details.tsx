"use client";

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

      {/* DADOS DA ENTREGA */}

      <div className="px-5">
        <Card className="mt-6 flex justify-around py-3">
          {/* CUSTO */}

          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="text-xs">Entrega</span>
              <BikeIcon size={14} />
            </div>

            {Number(product.restaurant.deliveryFee) > 0 ? (
              <p className="text-xs font-semibold">
                {formatCurrency(Number(product.restaurant.deliveryFee))}
              </p>
            ) : (
              <p className="text-xs font-semibold">Grátis</p>
            )}
          </div>

          {/* TEMPO */}

          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="text-xs">Entrega</span>
              <TimerIcon size={14} />
            </div>
            <p className="text-xs font-semibold">
              {product.restaurant.deliveryTimeMinutes} min
            </p>
          </div>
        </Card>
      </div>

      <div className="mt-6 space-y-2 px-5">
        <h3 className="font-semibold">Sobre</h3>

        <p className="text-sm text-muted-foreground">{product.description}</p>
      </div>

      <div className="mt-6 space-y-2 px-5">
        <h3 className="font-semibold">Sucos</h3>
        <ProductList products={complemantaryProducts} />
      </div>

      <div className="mt-6 px-5">
        <Button className="w-full font-semibold">Adicionar à sacola</Button>
      </div>
    </div>
  );
};

export default ProductDetails;
