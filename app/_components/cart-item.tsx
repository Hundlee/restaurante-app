import { ChevronLeftIcon, ChevronRightIcon, Trash2 } from "lucide-react";
import { CartContext, CartProduct } from "../_context/cart";
import { Button } from "./ui/button";
import Image from "next/image";
import { calculateProductTotalPrice, formatCurrency } from "../_helpers/price";
import { useContext } from "react";

interface CartItemProps {
  cartProducts: CartProduct;
}

const CartItem = ({ cartProducts }: CartItemProps) => {
  const {
    decreaseProductQuantity,
    increaseProductQuantity,
    removeProductToCart,
  } = useContext(CartContext);

  const handleDecreaseProductQuantity = () =>
    decreaseProductQuantity(cartProducts.id);

  const handleIncreaseProductQuantity = () =>
    increaseProductQuantity(cartProducts.id);

  const handleDeleteProductToCart = () => removeProductToCart(cartProducts.id);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-20">
          <Image
            src={cartProducts.imageUrl}
            alt={cartProducts.name}
            fill
            className="rounded-lg object-cover"
          />
        </div>
        <div className="space-y-1">
          <h3 className="truncate text-xs">{cartProducts.name}</h3>
          <div className="flex items-center gap-1">
            <h4 className="text-sm font-semibold">
              {formatCurrency(
                calculateProductTotalPrice(cartProducts) *
                  cartProducts.quantity,
              )}
            </h4>
            {cartProducts.discountPercentage > 0 && (
              <span className="text-xs text-muted-foreground line-through">
                {formatCurrency(
                  Number(cartProducts.price) * cartProducts.quantity,
                )}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-center">
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 border border-solid border-muted-foreground"
              onClick={handleDecreaseProductQuantity}
            >
              <ChevronLeftIcon />
            </Button>
            <span className="w-4 text-sm">{cartProducts.quantity}</span>
            <Button
              size="icon"
              className="h-8 w-8"
              onClick={handleIncreaseProductQuantity}
            >
              <ChevronRightIcon />
            </Button>
          </div>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={handleDeleteProductToCart}
      >
        <Trash2 size={18} />
      </Button>
    </div>
  );
};

export default CartItem;
