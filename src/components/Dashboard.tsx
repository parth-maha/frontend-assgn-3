import Card from "./ui/card";
import type { Item } from "../types/types";
import Loaders from "./ui/loaders";
import { Link, Outlet, useMatch } from "react-router-dom";
import { fetchProducts } from "../services/productService";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const { data: products = [], isLoading, isError } = useQuery<Item[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
    enabled : true,
    retry : 2,
    staleTime : 5 * 60 * 1000
  });

  const filteredProducts = products.filter(p => {
    const search = p.title.toLowerCase().includes(searchTerm.toLowerCase());
    const category =
      categoryFilter === "" || p.category === categoryFilter;
    return search && category;
  });

  const categories = Array.from(new Set(products.map(p => p.category)));

  const totalInventoryValue = Math.floor(
    products.reduce((t, p) => t + p.price * p.stock, 0)
  );

  const isProductPage = useMatch("/shop/products/:productId");

  if (isLoading) return <Loaders />;
  if (isError) return <div>Error loading products</div>;

  return (
    <div className="flex flex-col min-h-screen pt-16 p-4">
      {!isProductPage && (
        <>
          <h2 className="text-2xl font-bold mb-2">Products</h2>

          <div className="flex justify-between mb-3 text-sm">
            <span>Total Products: {products.length}</span>
            <span>Inventory Value: ${totalInventoryValue}</span>
          </div>

          <div className="flex gap-2 mb-4">
            <input
              placeholder="Search..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="border p-2"
            />
            <select
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              className="border p-2"
            >
              <option value="">All</option>
              {categories.map(c => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredProducts.map(item => (
              <Link key={item.id} to={`products/${item.id}`}>
                <Card item={item} />
              </Link>
            ))}
          </div>
        </>
      )}
      <Outlet />
    </div>
  );
};

export default Dashboard;