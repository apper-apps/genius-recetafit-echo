const API_URL = "https://api.openai.com/v1/chat/completions";
const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

if (!API_KEY) {
  console.error('OpenAI API key not found. Please add VITE_OPENAI_API_KEY to your .env file');
}

const openAIService = {
  async generateRecipe(formData) {
    try {
      // Build the prompt based on form data
      const herbalifeText = formData.incluyeHerbalife 
        ? "SÍ quiere incluir productos de Herbalife" 
        : "NO quiere incluir productos de Herbalife";

      const restriccionesText = formData.restricciones.trim() 
        ? `tiene restricciones: ${formData.restricciones}` 
        : "no tiene restricciones específicas";

      const prompt = `Actúa como un chef experto en nutrición saludable. Genera una receta personalizada en español para un usuario que desea una receta ${formData.tipoReceta.replace("-", " ")} con los ingredientes disponibles: ${formData.ingredientes}. El usuario indicó que ${restriccionesText}. También prefiere el sabor ${formData.saborPreferido} y ha dicho que ${herbalifeText}. La receta debe ser breve, sencilla, sabrosa y saludable, con pasos fáciles. Incluir: 1. Título atractivo 2. Lista de ingredientes 3. Instrucciones paso a paso 4. Tip nutricional 5. Frase motivadora final como '¡Recuerda que pequeños cambios generan grandes transformaciones!'. Si el usuario indicó que quiere incluir productos de Herbalife, sugiere alguno de los siguientes: Fórmula 1 (sabor correspondiente), Proteína Gold, Aloe o Té Herbalife. Respeta las restricciones y preferencias del usuario.`;

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: prompt
            }
          ],
          temperature: 0.8,
          max_tokens: 400
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.choices && data.choices.length > 0) {
        return data.choices[0].message.content;
      } else {
        throw new Error("No se recibió respuesta válida de OpenAI");
      }
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
      
      // Fallback recipe in case of API failure
      return this.generateFallbackRecipe(formData);
    }
  },

  generateFallbackRecipe(formData) {
    const recipeType = formData.tipoReceta.replace("-", " ");
    const herbalifeNote = formData.incluyeHerbalife 
      ? "Incluye tu producto Herbalife favorito para potenciar los beneficios nutricionales." 
      : "";

    return `**${recipeType.charAt(0).toUpperCase() + recipeType.slice(1)} Saludable con ${formData.saborPreferido}**

Ingredientes:
- ${formData.ingredientes}
${herbalifeNote ? `- Producto Herbalife recomendado (Fórmula 1 sabor ${formData.saborPreferido})` : ""}

Instrucciones:
1. Prepara todos los ingredientes lavándolos y cortándolos según sea necesario
2. Mezcla los ingredientes siguiendo tu receta favorita para ${recipeType}
3. Ajusta la consistencia y sabor según tus preferencias
4. Sirve inmediatamente para disfrutar todos los nutrientes
${herbalifeNote ? "5. Agrega el producto Herbalife según las instrucciones del envase" : ""}

Tip Nutricional: Esta combinación te aportará vitaminas, minerales y nutrientes esenciales para mantener tu energía durante el día.

${herbalifeNote}

¡Recuerda que pequeños cambios generan grandes transformaciones!`;
  }
};

export default openAIService;