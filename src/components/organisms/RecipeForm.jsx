import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import FormField from "@/components/molecules/FormField";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import Textarea from "@/components/atoms/Textarea";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import openAIService from "@/services/api/openAIService";
import webhookService from "@/services/api/webhookService";

const RecipeForm = ({ isHerbalifeSection = false, onRecipeGenerated }) => {
  const [formData, setFormData] = useState({
    tipoReceta: "",
    ingredientes: "",
    restricciones: "",
    incluyeHerbalife: isHerbalifeSection,
    saborPreferido: "",
    nombre: "",
    contacto: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const recipeTypes = [
    { value: "bebida-fria", label: "Bebida Fría" },
    { value: "bebida-caliente", label: "Bebida Caliente" },
    { value: "desayuno", label: "Desayuno" },
    { value: "snack", label: "Snack" },
    { value: "comida", label: "Comida" },
    { value: "cena", label: "Cena" }
  ];

  const flavors = [
    { value: "chocolate", label: "Chocolate" },
    { value: "vainilla", label: "Vainilla" },
    { value: "mango", label: "Mango" },
    { value: "fresa", label: "Fresa" },
    { value: "coco", label: "Coco" },
    { value: "otro", label: "Otro" }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.tipoReceta) newErrors.tipoReceta = "Selecciona un tipo de receta";
    if (!formData.ingredientes.trim()) newErrors.ingredientes = "Indica los ingredientes disponibles";
    if (!formData.saborPreferido) newErrors.saborPreferido = "Selecciona un sabor preferido";
    if (!formData.nombre.trim()) newErrors.nombre = "Ingresa tu nombre";
    if (!formData.contacto.trim()) newErrors.contacto = "Ingresa tu teléfono o correo";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.warn("Por favor completa todos los campos requeridos");
      return;
    }

    setIsLoading(true);
    
    try {
      // Generate recipe with OpenAI
      const recipe = await openAIService.generateRecipe(formData);
      
      if (recipe) {
        // Show recipe to user
        onRecipeGenerated(recipe, formData);
        
        // Send data to webhook
        const webhookData = {
          nombre: formData.nombre,
          telefono: formData.contacto,
          tipo_receta: formData.tipoReceta,
          ingredientes: formData.ingredientes,
          restricciones: formData.restricciones || "Ninguna",
          sabor_preferido: formData.saborPreferido,
          herbalife: formData.incluyeHerbalife ? "Sí" : "No",
          receta_generada: recipe
        };
        
        await webhookService.sendData(webhookData);
        
        toast.success("¡Receta generada y enviada exitosamente!");
        
        // Reset form
        setFormData({
          tipoReceta: "",
          ingredientes: "",
          restricciones: "",
          incluyeHerbalife: isHerbalifeSection,
          saborPreferido: "",
          nombre: "",
          contacto: ""
        });
      }
    } catch (error) {
      console.error("Error generating recipe:", error);
      toast.error("Error al generar la receta. Por favor intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
            <ApperIcon name="ChefHat" className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-surface-800">
              {isHerbalifeSection ? "Recetas con Herbalife" : "Recetas Saludables"}
            </h2>
            <p className="text-surface-600">
              Responde las preguntas para generar tu receta personalizada
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="¿Qué tipo de receta deseas?"
            error={errors.tipoReceta}
            required
          >
            <Select
              value={formData.tipoReceta}
              onChange={(e) => handleInputChange("tipoReceta", e.target.value)}
            >
              <option value="">Selecciona una opción</option>
              {recipeTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </Select>
          </FormField>

          <FormField
            label="¿Qué sabor prefieres?"
            error={errors.saborPreferido}
            required
          >
            <Select
              value={formData.saborPreferido}
              onChange={(e) => handleInputChange("saborPreferido", e.target.value)}
            >
              <option value="">Selecciona un sabor</option>
              {flavors.map(flavor => (
                <option key={flavor.value} value={flavor.value}>
                  {flavor.label}
                </option>
              ))}
            </Select>
          </FormField>
        </div>

        <FormField
          label="¿Qué ingredientes tienes disponibles?"
          error={errors.ingredientes}
          required
        >
          <Textarea
            value={formData.ingredientes}
            onChange={(e) => handleInputChange("ingredientes", e.target.value)}
            placeholder="Ej: avena, plátano, leche de almendras, miel..."
          />
        </FormField>

        <FormField
          label="¿Tienes alguna restricción o preferencia?"
        >
          <Textarea
            value={formData.restricciones}
            onChange={(e) => handleInputChange("restricciones", e.target.value)}
            placeholder="Ej: sin azúcar, sin lácteos, vegano, sin gluten..."
          />
        </FormField>

        {!isHerbalifeSection && (
          <FormField label="¿Deseas incluir productos Herbalife?">
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="herbalife"
                  checked={formData.incluyeHerbalife === true}
                  onChange={() => handleInputChange("incluyeHerbalife", true)}
                  className="mr-2 text-primary-500 focus:ring-primary-500"
                />
                Sí
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="herbalife"
                  checked={formData.incluyeHerbalife === false}
                  onChange={() => handleInputChange("incluyeHerbalife", false)}
                  className="mr-2 text-primary-500 focus:ring-primary-500"
                />
                No
              </label>
            </div>
          </FormField>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Tu nombre"
            error={errors.nombre}
            required
          >
            <Input
              value={formData.nombre}
              onChange={(e) => handleInputChange("nombre", e.target.value)}
              placeholder="Escribe tu nombre"
            />
          </FormField>

          <FormField
            label="Tu teléfono o correo"
            error={errors.contacto}
            required
          >
            <Input
              value={formData.contacto}
              onChange={(e) => handleInputChange("contacto", e.target.value)}
              placeholder="Teléfono o email"
            />
          </FormField>
        </div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full"
            size="lg"
          >
            {isLoading ? (
              <>
                <ApperIcon name="Loader2" className="w-5 h-5 mr-2 animate-spin" />
                Generando receta...
              </>
            ) : (
              <>
                <ApperIcon name="Sparkles" className="w-5 h-5 mr-2" />
                Generar Mi Receta
              </>
            )}
          </Button>
        </motion.div>
      </form>
    </Card>
  );
};

export default RecipeForm;