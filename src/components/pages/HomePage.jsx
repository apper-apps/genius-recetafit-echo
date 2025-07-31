import { useState } from "react";
import { motion } from "framer-motion";
import TabNavigation from "@/components/molecules/TabNavigation";
import RecipeForm from "@/components/organisms/RecipeForm";
import RecipeDisplay from "@/components/organisms/RecipeDisplay";
import RecipeHistory from "@/components/organisms/RecipeHistory";
import ApperIcon from "@/components/ApperIcon";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("recetas-generales");
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [currentUserInfo, setCurrentUserInfo] = useState(null);

  const tabs = [
    {
      id: "recetas-generales",
      label: "Recetas Generales",
      icon: "Utensils"
    },
    {
      id: "recetas-herbalife",
      label: "Recetas Herbalife",
      icon: "Leaf"
    },
    {
      id: "historial",
      label: "Historial",
      icon: "BookOpen"
    }
  ];

  const handleRecipeGenerated = (recipe, userInfo) => {
    setCurrentRecipe(recipe);
    setCurrentUserInfo(userInfo);
  };

  const handleCloseRecipe = () => {
    setCurrentRecipe(null);
    setCurrentUserInfo(null);
  };

  const handleViewHistoryRecipe = (recipe) => {
    setCurrentRecipe(recipe.receta_generada || recipe.content);
    setCurrentUserInfo(recipe.userInfo || { nombre: recipe.nombre });
  };

  const renderTabContent = () => {
    if (currentRecipe) {
      return (
        <RecipeDisplay
          recipe={currentRecipe}
          userInfo={currentUserInfo}
          onClose={handleCloseRecipe}
        />
      );
    }

    switch (activeTab) {
      case "recetas-generales":
        return (
          <RecipeForm
            isHerbalifeSection={false}
            onRecipeGenerated={handleRecipeGenerated}
          />
        );
      case "recetas-herbalife":
        return (
          <RecipeForm
            isHerbalifeSection={true}
            onRecipeGenerated={handleRecipeGenerated}
          />
        );
      case "historial":
        return (
          <RecipeHistory
            onViewRecipe={handleViewHistoryRecipe}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 to-surface-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-surface-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center">
              <ApperIcon name="ChefHat" className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
                RecetaFit Pro
              </h1>
              <p className="text-surface-600 mt-1">
                Recetas saludables personalizadas para tu estilo de vida
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Navigation Tabs */}
          <TabNavigation
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderTabContent()}
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-surface-200 mt-16">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <div className="flex items-center justify-center space-x-2 text-surface-600">
            <ApperIcon name="Heart" className="w-4 h-4 text-primary-500" />
            <span className="text-sm">
              Creado con amor para tu bienestar nutricional
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;