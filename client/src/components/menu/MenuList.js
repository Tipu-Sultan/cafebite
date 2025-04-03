import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMenu } from "../../redux/slices/menuSlice";
import MenuItem from "./MenuItem";
import FilterSection from "./FilterSection";

const MenuList = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sortOption, setSortOption] = useState("priceAsc");
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  const items = useSelector((state) => state.menu.items);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);

    dispatch(fetchMenu())
      .unwrap()
      .then(() => setLoading(false))
      .catch(() => setLoading(false)); // Ensure setLoading(false) even if an error occurs
  }, [dispatch]);

  const filteredItems = items
    .filter((item) => {
      const discountedPrice = (
        item.price -
        item.price * (item.discount / 100)
      ).toFixed(2);
      return (
        (selectedCategory ? item.category === selectedCategory : true) &&
        discountedPrice >= minPrice &&
        discountedPrice <= maxPrice
      );
    })
    .sort((a, b) => {
      const aDiscountedPrice = a.price - a.price * (a.discount / 100);
      const bDiscountedPrice = b.price - b.price * (b.discount / 100);

      if (sortOption === "priceAsc") return aDiscountedPrice - bDiscountedPrice;
      if (sortOption === "priceDesc")
        return bDiscountedPrice - aDiscountedPrice;
      if (sortOption === "rating") return b.rating - a.rating;
      return 0;
    });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        <p className="mt-4 text-lg font-semibold text-gray-700">
          Please wait, the server is starting... (50s)
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row p-4">
      {/* Filters Section */}
      <FilterSection
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        sortOption={sortOption}
        setSortOption={setSortOption}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
      />

      {/* Menu Items Section */}
      <div className="w-full sm:w-3/4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map((item) => (
            <MenuItem key={item._id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuList;
