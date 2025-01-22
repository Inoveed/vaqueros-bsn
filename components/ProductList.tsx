"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IRequest } from "@/lib/types";

interface DetailPageProps {
  request: IRequest;
}

type Product = {
  id: string;
  name: string;
  image: string;
  price: number;
  category: "alcohol" | "beer" | "food" | "beverage" | "candy" | "all";
};

type CartItem = Product & { quantity: number };

const Product: React.FC<DetailPageProps> = ({ request }: any) => {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [filter, setFilter] = useState<
    "all" | "alcohol" | "beer" | "food" | "beverage" | "candy"
  >("all");

  const products: Product[] = [
    {
      id: "1",
      name: "Whiskey",
      image:
        "https://images-cdn.ubuy.co.in/64ce5c03e612004d4d206c6c-jack-daniel-s-old-no-7-tennessee.jpg",
      price: 50,
      category: "alcohol",
    },
    {
      id: "2",
      name: "Beer",
      image: "https://www.unitedbreweries.com/images/our-brands/heineken.jpg",
      price: 5,
      category: "beer",
    },
    {
      id: "3",
      name: "Burger",
      image:
        "https://www.foodandwine.com/thmb/DI29Houjc_ccAtFKly0BbVsusHc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/crispy-comte-cheesburgers-FT-RECIPE0921-6166c6552b7148e8a8561f7765ddf20b.jpg",
      price: 10,
      category: "food",
    },
    {
      id: "4",
      name: "Soda",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQe0QogSQXZmAqf45bXvsjKT4SyWlcuvJajA&s",
      price: 2,
      category: "beverage",
    },
    {
      id: "5",
      name: "Candy",
      image: "https://pics.walgreens.com/prodimg/578558/450.jpg",
      price: 1,
      category: "candy",
    },
  ];

  const filteredProducts =
    filter === "all"
      ? products
      : products.filter((product) => product.category === filter);

  const handleAddToCart = (product: Product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleCartQuantityChange = (id: string, amount: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + amount) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const calculateTotal = () => {
    return cart.reduce(
      (acc, item) => {
        acc.totalPrice += item.price * item.quantity;
        acc.totalQuantity += item.quantity;
        return acc;
      },
      { totalPrice: 0, totalQuantity: 0 }
    );
  };

  const submitCarts = async () => {
    const sendForm = {
      items: cart,
      total: calculateTotal().totalPrice,
      quantity: calculateTotal().totalQuantity,
    };
    console.log("Submitting form:", sendForm);

    try {
      const response = await fetch("/paymentStripe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sendForm),
      });

      if (!response.ok) {
        throw new Error("Failed to submit the cart");
      }

      console.log("Payment submitted successfully");
    } catch (error) {
      console.error("Error submitting cart:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center p-6 bg-white shadow-md sticky top-0 z-10">
        <a href="/">
          <Image
            src="https://upload.wikimedia.org/wikipedia/en/a/a0/BayamonVaquerosBSN.png"
            alt="Logo"
            height={120}
            width={120}
          />
        </a>
        <button
          onClick={toggleCart}
          className="relative bg-gray-100 p-2 rounded-full shadow-md"
        >
          🛒
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
            {calculateTotal().totalQuantity}
          </span>
        </button>
      </header>

      {/* Filters */}
      <div className="flex flex-wrap justify-center items-center gap-4 p-4 bg-gray-50 shadow-sm">
        {["all", "alcohol", "beer", "food", "beverage", "candy"].map(
          (category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                filter === category
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => setFilter(category as typeof filter)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          )
        )}
      </div>

      {/* Product List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white shadow-md rounded-lg p-4">
            <div
              className="cursor-pointer"
              //   onClick={() =>
              //     router.push(`${request.seatId}/product/?product=${product.id}`)
              //   }
            >
              <Image
                src={product.image}
                alt={product.name}
                width={150}
                height={150}
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="text-lg font-bold mt-2">{product.name}</h3>
              <p className="text-gray-700">${product.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center justify-between mt-4">
              <button
                onClick={() => handleRemoveFromCart(product.id)}
                className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                -
              </button>
              <span>
                {cart.find((item) => item.id === product.id)?.quantity || 0}
              </span>
              <button
                onClick={() => handleAddToCart(product)}
                className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-20"
          onClick={(e) => e.target === e.currentTarget && toggleCart()}
        >
          <div className="bg-white w-80 h-full shadow-lg flex flex-col">
            {/* Header */}
            <div className="p-4 flex justify-between items-center border-b">
              <h2 className="text-lg font-bold">🛒</h2>
              <button onClick={toggleCart}>❌</button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between mb-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    width={50}
                    height={50}
                    className="rounded"
                  />
                  <div className="ml-4 flex-1">
                    <p className="font-bold">{item.name}</p>
                    <p>
                      ${item.price.toFixed(2)} x {item.quantity}
                    </p>
                    <p className="font-semibold text-gray-800">
                      Total: ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCartQuantityChange(item.id, -1)}
                        className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => handleCartQuantityChange(item.id, 1)}
                        className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {cart.length === 0 && (
                <p className="text-center text-gray-600 mt-4">
                  Your cart is empty.
                </p>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t">
              <div className="p-2 font-bold">
                Total: ${calculateTotal().totalPrice.toFixed(2)}
              </div>
              <button
                onClick={toggleCart}
                className="w-full bg-gray-200 text-gray-800 py-2 rounded-md mb-2"
              >
                Keep Shopping
              </button>
              <button
                onClick={submitCarts}
                className="w-full bg-green-600 text-white py-2 rounded-md"
                disabled={cart.length === 0}
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
