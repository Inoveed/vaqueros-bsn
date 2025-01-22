"use client";
import { useState } from "react";
import { Product, CartItem } from "@/lib/types";
import { IRequest } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

interface DetailPageProps {
  request: IRequest;
}

const DetailPage: React.FC<DetailPageProps> = ({ request }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");

  console.log(request);

  const product: Product = {
    id: 1,
    name: "Ergonomic Office Chair",
    image:
      "https://cdn.b12.io/client_media/etiAhpzV/1256ec20-d433-11ef-b6ed-0242ac110002-jpg-hero_image.jpeg",
    price: 199.99,
    description: [
      { icon: "🛠️", text: "Adjustable height for comfort" },
      { icon: "🌬️", text: "Breathable mesh fabric" },
      { icon: "💺", text: "Ergonomic lumbar support" },
      { icon: "🖤", text: "Sleek, minimalist design" },
      { icon: "🖥️", text: "Perfect for office or home" },
      { icon: "📦", text: "Easy assembly with tools included" },
    ],
  };

  const handleAddToCart = () => {
    setModalMessage("Adding to the Cart...");
    setIsModalOpen(true);
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCart((prevCart) => [...prevCart, { ...product, quantity }]);
    }
    setQuantity(1);

    setTimeout(() => {
      setIsModalOpen(false);
      setIsCartOpen(true);
    }, 1000);
  };

  const handleQuantityChange = (amount: number) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  const handleCartQuantityChange = (id: number, amount: number) => {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(0, item.quantity + amount) }
        : item
    );
    const removedItem = updatedCart.find((item) => item.quantity === 0);
    setCart(updatedCart.filter((item) => item.quantity > 0));

    if (removedItem) {
      setModalMessage("Removed");
      setIsModalOpen(true);
      setTimeout(() => setIsModalOpen(false), 1000);
    }
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  return (
    <div className="relative bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center p-6 bg-white shadow-md sticky top-0 z-10">
        <Link className="navbar-brand" href="/">
          <Image
            src={
              "https://upload.wikimedia.org/wikipedia/en/a/a0/BayamonVaquerosBSN.png"
            }
            alt="Logo"
            height={120}
            width={120}
          />
        </Link>
        <button
          onClick={toggleCart}
          className="relative bg-gray-100 p-2 rounded-full shadow-md"
        >
          🛒
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
            {cart.reduce((total, item) => total + item.quantity, 0)}
          </span>
        </button>
      </header>

      {/* Main Section */}
      <main className="flex flex-col md:flex-row items-start justify-between p-8 gap-8">
        {/* Product Image */}
        <div className="flex-1">
          <img
            src={product.image}
            alt={product.name}
            width={500}
            height={500}
            className="rounded-lg shadow-md"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
          <p className="text-xl font-semibold text-gray-700 mb-4">
            ${product.price.toFixed(2)}
          </p>
          <div className="mb-6">
            {product.description.map((desc, index) => (
              <div key={index} className="flex items-center mb-2">
                <span className="text-lg">{desc.icon}</span>
                <p className="ml-2 text-gray-600">{desc.text}</p>
              </div>
            ))}
          </div>

          {/* Quantity Selector */}
          <div className="flex flex-col items-center gap-4 mb-6 md:items-start md:flex-row">
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                readOnly
                className="w-12 text-center border border-gray-300 rounded-md"
              />
              <button
                onClick={() => handleQuantityChange(1)}
                className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="w-full md:w-auto bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </main>

      {/* Detailed Description */}
      <section className="px-8 py-4 mb-4 bg-white shadow-md rounded-lg mx-8">
        <h3 className="text-2xl font-bold mb-4">More About the Product</h3>
        <p className="text-gray-600">
          Transform your workspace with the Ergonomic Office Chair designed for
          maximum comfort and support. This chair is perfect for long hours of
          work, offering durability, style, and functionality.
        </p>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <p className="text-xl font-semibold">{modalMessage}</p>
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-20">
          <div className="bg-white w-80 h-full shadow-lg flex flex-col">
            <div className="p-4 flex justify-between items-center border-b">
              <h2 className="text-lg font-bold">Cart</h2>
              <button onClick={toggleCart}>❌</button>
            </div>
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
            </div>
            <div className="p-4 border-t">
              <button
                onClick={toggleCart}
                className="w-full bg-gray-200 text-gray-800 py-2 rounded-md mb-2"
              >
                Keep Shopping
              </button>
              <button className="w-full bg-green-600 text-white py-2 rounded-md">
                Pay Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailPage;
