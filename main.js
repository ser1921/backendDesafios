const fs = require("fs").promises;
const path = require("path");

class ProductManager {
    constructor() {
        this.products = [];
        this.Id = 1;
        this.rutaArchivo = "./productList.json";
        this.initializeFile(); 
    }

    async initializeFile() {
        try {
            
            await fs.access(this.rutaArchivo);
        } catch (error) {
            
            await fs.writeFile(this.rutaArchivo, "[]");
            console.log(`File ${this.rutaArchivo} created successfully.`);
        }
    }

    async addProduct(title, description, price, thumbnail, code, stock) {
        try {
            const currentProducts = await this.readProducts();
    
            if (!title || !description || !price || !thumbnail || !code || !stock) {
                console.log("Missing fields.");
                return null;
            } else if (currentProducts.some(product => product.code === code)) {
                console.error("Product with the same code already exists in the database.");
                return null;
            } else {
                
                const highestId = currentProducts.reduce((maxId, product) => Math.max(maxId, product.id), 0);
    
                const newProduct = {
                    id: highestId + 1, 
                    title,
                    description,
                    price,
                    thumbnail,
                    code,
                    stock
                };
    
                currentProducts.push(newProduct);
                await this.saveProducts(currentProducts);
                return newProduct;
            }
        } catch (error) {
            console.log("Error creating product:", error);
            return null;
        }
    }
  
      async readProducts() {
          try {
              const content = await fs.readFile(this.rutaArchivo, "utf-8");
              return JSON.parse(content);
          } catch (error) {
              console.log("Error reading products:", error);
              return [];
          }
      }
  
      async saveProducts(productArray) {
          try {
              await fs.writeFile(this.rutaArchivo, JSON.stringify(productArray, null, 2));
          } catch (error) {
              console.log("Error saving products:", error);
          }
      }
  
      async getProducts() {
          try {
              const products = await this.readProducts();
              console.log("Products registered:", products);
              return products;
          } catch (error) {
              console.log("Error getting products:", error);
              return [];
          }
      }
  
      async getProductById(id) {
        try {
            const products = await this.readProducts();
            const product = products.find(product => product.id === id);
            if (product) {
                console.log(product);
                return product;
            } else {
                console.log("Product does not exist.");
                return null;
            }
        } catch (error) {
            console.error("Error getting product by ID:", error);
            return null;
        }
    }
  
    async updateProduct(id, fieldToUpdate, newValue) {
      try {
          const products = await this.readProducts();
          const index = products.findIndex(product => product.id === id);
  
          if (index !== -1) {
              // Check if the specified field exists in the product
              if (fieldToUpdate in products[index]) {
                  // Update the specified field with the new value
                  products[index][fieldToUpdate] = newValue;
                  await this.saveProducts(products);
                  console.log(`Product with ID ${id} updated successfully.`);
                  console.log(products[index]);
                  return products[index];
              } else {
                  console.error(`Field '${fieldToUpdate}' does not exist in product.`);
                  return null;
              }
          } else {
              console.error("Product not found for updating.");
              return null;
          }
      } catch (error) {
          console.error("Error updating product:", error);
          return null;
      }
  }
  
  async deleteProduct(id) {
    try {
      const products = await this.readProducts();
      const index = products.findIndex(product => product.id === id);
      if (index !== -1) {
        const deletedProduct = products.splice(index, 1)[0]; 
        await this.saveProducts(products);
        console.log(`Product with ID ${id} deleted successfully.`);
        console.log(deletedProduct); 
        return deletedProduct; 
      } else {
        console.error("Product not found for deletion");
        return null;
      }
    } catch (error) {
      console.error("Error deleting product", error);
      return null;
    }
  }

  
}

productManager= new ProductManager();
