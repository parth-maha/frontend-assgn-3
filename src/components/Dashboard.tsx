import { useEffect, useState } from "react";
import Card from "./ui/card";
import type { Item } from "../types/types";
import Loaders from "./ui/loaders";
import { Link } from "react-router-dom";
import { fetchProducts } from "../services/productService";
import { useQuery } from "@tanstack/react-query";

const Dashboard = () => {
  const [products, setProducts] = useState<Item[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const {data,isLoading,isError} = useQuery({
    queryKey : ['products'],
    queryFn: fetchProducts
  })

  useEffect(()=>{
    if(data){
      setProducts(data)
    }
  },[data])

  const filteredProducts = products.filter((product) => {
    const search = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "" || product.category === categoryFilter;
    return search && matchesCategory;
  });

  const handleCategoryChange = (value: string) => {
    setCategoryFilter(value);
    setSearchTerm("");
  };
  // filter distinct categoreies
  const categories = Array.from(new Set(products.map((p) => p.category)));

  // total inventory value
  const totalInventoryValue = Math.floor(
    products.reduce(
      (total, product) => total + product.price * product.stock,
      0,
    ),
  );

  if(isLoading){
    return <Loaders/>
  }

  if(isError){
    <div>Error loading products</div>
  }
  return (
    <div className="flex flex-col md:flex-row min-h-screen pt-16">
      <div className="flex-1 p-4 md:p-4">
        <div className="flex justify-between"></div>
        <h2 className="text-2xl font-bold mb-1">Products</h2>
        <div className="flex gap-5 justify-between">
          <div className="mb-4 font-light">
            Total Products : {products.length}
          </div>
          <div className="text-end font-light">
            Inventory Value : ${totalInventoryValue}
          </div>
        </div>
        <div className="space-x-2 mb-2">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-sm p-2 mt-1"
          />
          <select
            value={categoryFilter}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="p-2 border border-gray-300"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {isLoading ? (<Loaders />) : products.length > 0 ? (
            filteredProducts.map((item) => (
              <Link to={`/shop/products/${item.id}`} key={item.id} className="hover:shadow-2xl cursor-pointer" >
                <Card key={item.id} item={item} onRemove={()=> console.log("Remove item, dashboard")} />
              </Link>
            ))
          ) : (
            <p className="text-gray-500">Out of Stock</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;