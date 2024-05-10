import { Restaurant } from "@prisma/client";
import { BikeIcon, HeartIcon, StarIcon, TimerIcon } from "lucide-react";
import Image from "next/image";
import { formatCurrency } from "../_helpers/price";
import { Button } from "./ui/button";
import Link from "next/link";

interface RestauranteItemProps {
  restaurant: Restaurant;
}

const RestaurantItem = ({ restaurant }: RestauranteItemProps) => {
  return (
    <Link
      className="min-w-[266px] max-w-[266px]"
      href={`/restaurants/${restaurant.id}`}
    >
      <div className="w-full space-y-3">
        <div className="relative h-[133px] w-full">
          <Image
            src={restaurant.imageUrl}
            alt={restaurant.name}
            fill
            className="rounded-lg object-cover shadow-md"
          />

          <div className="absolute left-2 top-2 flex items-center gap-[2px] rounded-full bg-white px-2 py-[2px] text-black">
            <StarIcon size={12} className="fill-yellow-500 text-yellow-500" />
            <span className="text-xs font-semibold">5.0</span>
          </div>

          <Button
            className="absolute right-2 top-2 flex h-7 w-7 items-center rounded-full bg-gray-700"
            size="icon"
          >
            <HeartIcon size={16} className="fill-white" />
          </Button>
        </div>
        <div>
          <h3 className="truncate text-sm font-semibold">{restaurant.name}</h3>
          <div className="flex gap-3">
            <div className="flex items-center gap-1">
              <BikeIcon className="text-primary" size={16} />
              <span className="text-sm text-muted-foreground">
                {Number(restaurant.deliveryFee) === 0
                  ? "Entrega grátis"
                  : formatCurrency(Number(restaurant.deliveryFee))}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <TimerIcon className="text-primary" size={16} />
              <span className="text-sm text-muted-foreground">
                {restaurant.deliveryTimeMinutes} min
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantItem;
