import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import RecipeDetailsPage from "./pages/RecipeDetailsPage";

function App() {
  return (
    <Router>
      <div className="font-sans">
        <Navbar />
        <div className="p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/recipe/:id" element={<RecipeDetailsPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
