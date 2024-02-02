class ProductManager{
    constructor(){
        this.products=[]
        this.idCounter=0
    }
    addProduct(item) {
        const { title, description, price, thumbnail, code, stock } = item;
    
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            throw new Error("Todos los campos son obligatorios");
        }
        const codeExists = this.products.some(product => product.code === code);
        if (codeExists) {
            throw new Error("El código del producto ya existe");
        }
    
        const product = {
            id: this.idCounter++,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };
    
        this.products.push(product);
        return product;
    }
    getProducts() {
        return this.products;
    }
    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (!product) {
            throw new Error("Notfound");
        }
        return product;
    
    }   
}


//Aray vacio
// const productManager = new ProductManager();
// console.log(productManager.products);

const manager = new ProductManager();

// Agregar productos
manager.addProduct({
    title: "Producto 1",
    description: "Descripción del Producto 1",
    price: 10.99,
    thumbnail: "producto1.jpg",
    code: "P001",
    stock: 100
});
manager.addProduct({
    title: "Producto 2",
    description: "Descripción del Producto 2",
    price: 10.99,
    thumbnail: "producto2.jpg",
    code: "P004",
    stock: 100
});

//Producto duplicado

/*manager.addProduct({
    title: "Producto 1",
    description: "Descripción del Producto 1",
    price: 10.99,
    thumbnail: "producto1.jpg",
    code: "P001",
    stock: 100
});*/



// Imprimir el nuevo producto creado

const productos = manager.getProducts();
console.log("Todos los productos:", productos);

// Obtener producto por ID
const idProducto = 1;
const productoPorId = manager.getProductById(idProducto);
console.log("Producto con ID", idProducto, ":", productoPorId);
