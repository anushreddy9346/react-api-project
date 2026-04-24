import React, { useState, useEffect } from 'react';
import Header from './Components/Header';
import Controls from './Components/Controls';
import ProductCard from './Components/ProductCard';
import Pagination from './Components/Pagination';
import './App.css';

function App() {
  // Main State
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  
  // Feature State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);
  const [darkMode, setDarkMode] = useState(false);
  
  const itemsPerPage = 6;

  // Fetch Data
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();
      setProducts(data);
      
      // Extract unique categories
      const uniqueCategories = [...new Set(data.map(item => item.category))];
      setCategories(uniqueCategories);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Update theme
  useEffect(() => {
    if (darkMode) {
      document.body.setAttribute('data-theme', 'dark');
    } else {
      document.body.removeAttribute('data-theme');
    }
  }, [darkMode]);

  // Derived state: Filtered and Sorted products
  let processedProducts = [...products];

  // 1. Filter by category
  if (selectedCategory !== 'All') {
    processedProducts = processedProducts.filter(p => p.category === selectedCategory);
  }

  // 2. Filter by search term
  if (searchTerm.trim() !== '') {
    const term = searchTerm.toLowerCase();
    processedProducts = processedProducts.filter(p => 
      p.title.toLowerCase().includes(term)
    );
  }

  // 3. Sort
  if (sortOrder === 'price-asc') {
    processedProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === 'price-desc') {
    processedProducts.sort((a, b) => b.price - a.price);
  } else if (sortOrder === 'rating') {
    processedProducts.sort((a, b) => b.rating.rate - a.rating.rate);
  }

  // 4. Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = processedProducts.slice(indexOfFirstItem, indexOfLastItem);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, sortOrder]);

  return (
    <div className="app-container">
      <Header 
        darkMode={darkMode} 
        setDarkMode={setDarkMode}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onRefresh={fetchProducts}
      />

      <Controls 
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />

      {/* Loading State */}
      {loading && (
        <div className="status-container">
          <div className="loader"></div>
          <p>Loading amazing products...</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="status-container">
          <div className="error-message">Oops! {error}</div>
          <button className="btn btn-primary" onClick={fetchProducts}>Try Again</button>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && processedProducts.length === 0 && (
        <div className="status-container">
          <h3>No products found!</h3>
          <p style={{ color: 'var(--secondary-text)', marginTop: '0.5rem' }}>
            Try adjusting your search or category filter.
          </p>
        </div>
      )}

      {/* Data rendering map() */}
      {!loading && !error && processedProducts.length > 0 && (
        <>
          <div className="products-grid">
            {currentItems.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <Pagination 
            currentPage={currentPage}
            totalItems={processedProducts.length}
            itemsPerPage={itemsPerPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}

export default App;
