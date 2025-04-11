import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items: initialItems }) {
  const [items, setItems] = useState(initialItems);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  function handleSearchChange(event) {
    setSearchTerm(event.target.value);
  }

  function handleItemFormSubmit(newItem) {
    // Update the component's state with the new item
    setItems([...items, newItem]);
  }

  const itemsToDisplay = items.filter((item) => {
    // Filter by category
    if (selectedCategory !== "All" && item.category !== selectedCategory) {
      return false;
    }
    
    // Filter by search term
    if (searchTerm && !item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onItemFormSubmit={handleItemFormSubmit} />
      <Filter 
        onCategoryChange={handleCategoryChange} 
        search={searchTerm} 
        onSearchChange={handleSearchChange} 
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
