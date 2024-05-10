import { db } from "../_lib/prisma";
import RestaurantItem from "./restaurant-item";

const RestauranteList = async () => {
  const restaurants = await db.restaurant.findMany({
    take: 10,
  });

  return (
    <div className="flex gap-4 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
      {restaurants.map((restaurant) => (
        <RestaurantItem restaurant={restaurant} key={restaurant.id} />
      ))}
    </div>
  );
};

export default RestauranteList;
