import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const RecipeDisplay = ({ recipe, userInfo, onClose }) => {
  if (!recipe) return null;

  // Parse the recipe content
  const parseRecipe = (content) => {
    const sections = {
      titulo: "",
      ingredientes: [],
      instrucciones: [],
      tipNutricional: "",
      fraseMotivadora: ""
    };

    const lines = content.split("\n").filter(line => line.trim());
    let currentSection = "";

    for (const line of lines) {
      const trimmedLine = line.trim();
      
      if (trimmedLine.toLowerCase().includes("título") || 
          trimmedLine.toLowerCase().includes("nombre") ||
          (trimmedLine.includes("**") && !sections.titulo)) {
        sections.titulo = trimmedLine.replace(/\*\*/g, "").replace(/título:?/i, "").replace(/nombre:?/i, "").trim();
        currentSection = "titulo";
      } else if (trimmedLine.toLowerCase().includes("ingrediente")) {
        currentSection = "ingredientes";
      } else if (trimmedLine.toLowerCase().includes("instruccione") || 
                 trimmedLine.toLowerCase().includes("preparación") ||
                 trimmedLine.toLowerCase().includes("paso")) {
        currentSection = "instrucciones";
      } else if (trimmedLine.toLowerCase().includes("tip") || 
                 trimmedLine.toLowerCase().includes("consejo")) {
        currentSection = "tip";
      } else if (trimmedLine.toLowerCase().includes("motivador") || 
                 trimmedLine.toLowerCase().includes("frase") ||
                 trimmedLine.includes("pequeños cambios")) {
        currentSection = "frase";
      } else if (trimmedLine.startsWith("-") || trimmedLine.match(/^\d+\./)) {
        if (currentSection === "ingredientes") {
          sections.ingredientes.push(trimmedLine.replace(/^[-\d.]\s*/, ""));
        } else if (currentSection === "instrucciones") {
          sections.instrucciones.push(trimmedLine.replace(/^[-\d.]\s*/, ""));
        }
      } else if (trimmedLine && !trimmedLine.includes("**")) {
        if (currentSection === "tip") {
          sections.tipNutricional = trimmedLine;
        } else if (currentSection === "frase") {
          sections.fraseMotivadora = trimmedLine;
        } else if (!sections.titulo && currentSection === "titulo") {
          sections.titulo = trimmedLine;
        }
      }
    }

    // Fallback title if not found
    if (!sections.titulo) {
      sections.titulo = `Receta Personalizada para ${userInfo?.nombre || "Ti"}`;
    }

    return sections;
  };

  const parsedRecipe = parseRecipe(recipe);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <Card className="border-l-4 border-l-primary-500">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-accent-500 to-accent-600 rounded-xl flex items-center justify-center">
              <ApperIcon name="Utensils" className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-surface-800">
                ¡Tu receta está lista!
              </h2>
              <p className="text-surface-600">
                Especialmente creada para {userInfo?.nombre}
              </p>
            </div>
          </div>
          <Button variant="ghost" onClick={onClose}>
            <ApperIcon name="X" className="w-5 h-5" />
          </Button>
        </div>

        <div className="space-y-8">
          {/* Recipe Title */}
          <div className="text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent mb-2">
              {parsedRecipe.titulo}
            </h1>
          </div>

          {/* Ingredients */}
          {parsedRecipe.ingredientes.length > 0 && (
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <ApperIcon name="ShoppingCart" className="w-5 h-5 text-primary-500" />
                <h3 className="text-xl font-semibold text-surface-800">
                  Ingredientes
                </h3>
              </div>
              <div className="bg-surface-50 rounded-xl p-4">
                <ul className="space-y-2">
                  {parsedRecipe.ingredientes.map((ingredient, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-surface-700">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Instructions */}
          {parsedRecipe.instrucciones.length > 0 && (
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <ApperIcon name="Clock" className="w-5 h-5 text-accent-500" />
                <h3 className="text-xl font-semibold text-surface-800">
                  Instrucciones
                </h3>
              </div>
              <div className="space-y-3">
                {parsedRecipe.instrucciones.map((step, index) => (
                  <div key={index} className="flex space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-accent-500 to-accent-600 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-surface-700 pt-1">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Nutritional Tip */}
          {parsedRecipe.tipNutricional && (
            <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl p-6">
              <div className="flex items-center space-x-2 mb-3">
                <ApperIcon name="Lightbulb" className="w-5 h-5 text-primary-600" />
                <h3 className="text-lg font-semibold text-primary-800">
                  Tip Nutricional
                </h3>
              </div>
              <p className="text-primary-700">{parsedRecipe.tipNutricional}</p>
            </div>
          )}

          {/* Motivational Phrase */}
          {parsedRecipe.fraseMotivadora && (
            <div className="text-center bg-gradient-to-r from-accent-500 to-accent-600 rounded-xl p-6 text-white">
              <ApperIcon name="Heart" className="w-8 h-8 mx-auto mb-3" />
              <p className="text-lg font-medium">
                {parsedRecipe.fraseMotivadora}
              </p>
            </div>
          )}
        </div>
      </Card>

      <div className="flex justify-center">
        <Button
          onClick={onClose}
          variant="outline"
          className="min-w-[200px]"
        >
          <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
          Generar Otra Receta
        </Button>
      </div>
    </motion.div>
  );
};

export default RecipeDisplay;