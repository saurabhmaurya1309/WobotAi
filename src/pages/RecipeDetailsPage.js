import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";

const RecipeDetailsPage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/${id}/information`,
          {
            params: {
              apiKey: "37df2ec04b21432bacdab4414445f288",
            },
          }
        );
        setRecipe(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to load recipe details. Please try again.");
      }
    };

    fetchRecipeDetails();
  }, [id]);

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (!recipe) {
    return <Spinner/>;
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <Link
        to="/"
        className="text-blue-600 underline hover:text-blue-800 mb-4 inline-block"
      >
        Back to Home
      </Link>
      <h1 className="text-4xl font-bold mb-6 text-gray-800 text-center">
        {recipe.title}
      </h1>
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full max-w-2xl mx-auto rounded-lg shadow-lg"
      />
      <h2 className="text-2xl font-semibold mt-6 text-gray-700">Ingredients</h2>
      <ul className="list-disc pl-8 mt-2">
        {recipe.extendedIngredients &&
          recipe.extendedIngredients.map((ingredient) => (
            <li key={ingredient.id} className="text-gray-600">
              {ingredient.original}
            </li>
          ))}
      </ul>
      <h2 className="text-2xl font-semibold mt-6 text-gray-700">Instructions</h2>
      <div
        className="prose mt-2 text-gray-600"
        dangerouslySetInnerHTML={{
          __html: recipe.instructions || "No instructions available.",
        }}
      ></div>
    </div>
  );
};

export default RecipeDetailsPage;
