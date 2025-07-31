import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import Empty from "@/components/ui/Empty";
import historyService from "@/services/api/historyService";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const RecipeHistory = ({ onViewRecipe }) => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 300)); // Simulate loading
      const data = await historyService.getAll();
      setRecipes(data);
    } catch (error) {
      console.error("Error loading history:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteRecipe = async (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta receta?")) {
      try {
        await historyService.delete(id);
        setRecipes(prev => prev.filter(recipe => recipe.Id !== id));
      } catch (error) {
        console.error("Error deleting recipe:", error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <Card key={i} className="animate-pulse">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-surface-200 rounded-xl"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-surface-200 rounded w-3/4"></div>
                <div className="h-3 bg-surface-200 rounded w-1/2"></div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <Empty
        title="No tienes recetas guardadas"
        description="Cuando generes tu primera receta, aparecerá aquí para que puedas verla cuando quieras."
        icon="BookOpen"
        actionText="Generar Mi Primera Receta"
        onAction={() => window.location.hash = "#recetas-generales"}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-surface-800">
            Historial de Recetas
          </h2>
          <p className="text-surface-600">
            {recipes.length} receta{recipes.length !== 1 ? "s" : ""} guardada{recipes.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Button
          variant="outline"
          onClick={loadHistory}
          className="flex items-center space-x-2"
        >
          <ApperIcon name="RefreshCw" className="w-4 h-4" />
          <span>Actualizar</span>
        </Button>
      </div>

      <div className="grid gap-4">
        {recipes.map((recipe, index) => (
          <motion.div
            key={recipe.Id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-elevated cursor-pointer group">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <ApperIcon name="ChefHat" className="w-8 h-8 text-white" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-surface-800 group-hover:text-primary-600 transition-colors truncate">
                        {recipe.titulo}
                      </h3>
                      <p className="text-sm text-surface-600 mt-1">
                        Para: {recipe.userInfo?.nombre}
                      </p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-surface-500">
                        <span className="flex items-center space-x-1">
                          <ApperIcon name="Calendar" className="w-3 h-3" />
                          <span>
                            {format(new Date(recipe.timestamp), "dd MMM yyyy", { locale: es })}
                          </span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <ApperIcon name="Clock" className="w-3 h-3" />
                          <span>
                            {format(new Date(recipe.timestamp), "HH:mm")}
                          </span>
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewRecipe(recipe);
                        }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ApperIcon name="Eye" className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteRecipe(recipe.Id);
                        }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700"
                      >
                        <ApperIcon name="Trash2" className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="inline-flex items-center px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full">
                      {recipe.tipoReceta?.replace("-", " ")}
                    </span>
                    <span className="inline-flex items-center px-2 py-1 bg-accent-100 text-accent-700 text-xs rounded-full">
                      {recipe.saborPreferido}
                    </span>
                    {recipe.incluyeHerbalife && (
                      <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                        Con Herbalife
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecipeHistory;