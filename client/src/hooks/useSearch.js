import { useState, useMemo } from "react";

const useSearch = (items = [], searchKeys = ["name", "orderId", "itemName"]) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Memoize the filtered items to optimize performance
  const filteredItems = useMemo(() => {
    if (!searchQuery) return items;

    // Filter items dynamically based on all provided search keys
    return items.filter((item) => {
      if (!item) return false; // Skip undefined or null items

      // Check for matches in the main item properties (top-level keys)
      const matchesMainProperties = searchKeys?.some((key) =>
        String(item[key] || item?.userDetails?.[key] || "").toLowerCase().includes(searchQuery.toLowerCase())
      );

      // Check for matches in the nested totalItems (if any)
      const matchesTotalItems = Array.isArray(item?.totalItems) &&
        item?.totalItems?.some((totalItem) =>
          searchKeys.some((key) =>
            String(totalItem?.[key] || "").toLowerCase().includes(searchQuery.toLowerCase())
          )
        );

      return matchesMainProperties || matchesTotalItems;
    });
  }, [items, searchQuery, searchKeys]);

  return { searchQuery, setSearchQuery, filteredItems };
};

export default useSearch;
