import recipeHistoryData from "@/services/mockData/recipeHistory.json";

const historyService = {
  data: [...recipeHistoryData],

  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 200));
    return [...this.data].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  },

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const recipe = this.data.find(item => item.Id === parseInt(id));
    return recipe ? { ...recipe } : null;
  },

  async create(item) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const maxId = this.data.length > 0 ? Math.max(...this.data.map(item => item.Id)) : 0;
    const newItem = {
      ...item,
      Id: maxId + 1,
      timestamp: new Date().toISOString()
    };
    this.data.push(newItem);
    return { ...newItem };
  },

  async update(id, data) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = this.data.findIndex(item => item.Id === parseInt(id));
    if (index !== -1) {
      this.data[index] = { ...this.data[index], ...data };
      return { ...this.data[index] };
    }
    return null;
  },

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = this.data.findIndex(item => item.Id === parseInt(id));
    if (index !== -1) {
      const deletedItem = { ...this.data[index] };
      this.data.splice(index, 1);
      return deletedItem;
    }
    return null;
  }
};

export default historyService;