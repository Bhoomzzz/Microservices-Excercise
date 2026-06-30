import { useState, useMemo } from "react";

export const useProductSearch = (products) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
      return matchesSearch && matchesPrice;
    });
  }, [products, searchTerm, minPrice, maxPrice]);

  return {
    searchTerm,
    setSearchTerm,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    filteredProducts,
  };
};
