import React from 'react';

const Controls = ({ categories, selectedCategory, setSelectedCategory, sortOrder, setSortOrder }) => {
  return (
    <div className="controls">
      <div className="control-group">
        <label htmlFor="category">Category:</label>
        <select 
          id="category" 
          className="control-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="control-group">
        <label htmlFor="sort">Sort By:</label>
        <select 
          id="sort" 
          className="control-select"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="default">Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>
    </div>
  );
};

export default Controls;
