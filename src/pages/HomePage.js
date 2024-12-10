import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchRecipes = async (query = "") => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://api.spoonacular.com/recipes/complexSearch",
        {
          params: {
            apiKey: "898b505db996411c8ea542462552fed4",
            number: 15,
            query,
          },
        }
      );
      setRecipes(response.data.results);
      setError(null);
    } catch (err) {
      setError("Failed to load recipes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes(searchQuery);
  }, [searchQuery]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300">
      <div className="p-8">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
          Recipe Book
        </h1>
        {/* Search Bar */}
        <div className="mb-8 w-2/5 flex items-center justify-center mx-auto">
          <input
            type="text"
            placeholder="Search by name or ingredients..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full border-2 border-gray-400 rounded-lg px-4 py-2 text-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* Loading Spinner */}
        {loading && <div className="text-center text-lg">Loading...</div>}
        {/* Recipes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <Link key={recipe.id} to={`/recipe/${recipe.id}`}>
              <div className="border p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300 bg-white">
                <h2 className="text-xl font-semibold text-gray-800">
                  {recipe.title}
                </h2>
                <p className="text-gray-500 mt-2">Click to view details</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
