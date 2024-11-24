import React from 'react'

const FilterSection = ({
    minPrice,setMinPrice,
    maxPrice,setMaxPrice,
    sortOption,setSortOption,
    showFilters,setShowFilters,
    setSelectedCategory,selectedCategory
}) => {
  return (
    <div className="w-full sm:w-1/4 mb-4 sm:mb-0">
        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="block sm:hidden mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>

        {/* Filters */}
        <div className={`${showFilters ? 'block' : 'hidden'} sm:block p-4 sticky top-0 h-screen overflow-y-auto`}>
          {/* Category Filter */}
          <div className="flex flex-col mb-4">
            <label className="text-sm text-gray-600 font-semibold">Category</label>
            <select
              onChange={(e) => setSelectedCategory(e.target.value)}
              value={selectedCategory}
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              <option value="burgers">Burgers</option>
              <option value="pizza">Pizza</option>
              <option value="Main Course">Main Course</option>
              <option value="drinks">Drinks</option>
              <option value="desserts">Desserts</option>
            </select>
          </div>

          {/* Price Range Filter */}
          <div className="flex flex-col mb-4">
            <label className="text-sm text-gray-600 font-semibold">Price Range</label>
            <div className="flex flex-col items-start space-y-2">
              <div className="flex justify-between w-full text-sm text-gray-600">
                <span>Min: ₹{minPrice}</span>
                <span>Max: ₹{maxPrice}</span>
              </div>
              <input
                type="range"
                className="w-full appearance-none h-2 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
                max="1000"
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
              />
              <input
                type="range"
                className="w-full appearance-none h-2 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                min={minPrice}
                max="1000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
            </div>
          </div>


          {/* Sorting Filter */}
          <div className="flex flex-col mb-4">
            <label className="text-sm text-gray-600 font-semibold">Sort By</label>
            <select
              onChange={(e) => setSortOption(e.target.value)}
              value={sortOption}
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>
      </div>
  )
}

export default FilterSection