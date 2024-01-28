let products = []

class ProductManager {
    static idCounter = 1
    constructor(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            throw new Error('Todos los campos son obligatorios.');
        }
        this.id=ProductManager.idCounter++
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock

        if (this.codeExists()) {
            throw new Error('El código ya existe.');
        }
    }

    // Método para verificar si el código ya existe en los productos
    codeExists() {
        return products.some(product => product.code === this.code);
    }

    addProduct() {
        // Verificar que el código no esté repetido
        if (this.codeExists()) {
            throw new Error('El código ya existe.');
        }
        products.push(this);
    }
    
    static getProducts() {
        return products;
    }
   
}

const producto1 = new ProductManager("Título", "Descripción", 10.99, "imagen.jpg", 12, 50);
const producto2 = new ProductManager("Título", "Descripción", 10.99, "imagen.jpg", 12, 50);


producto1.addProduct();
producto2.addProduct();

console.log(products);


