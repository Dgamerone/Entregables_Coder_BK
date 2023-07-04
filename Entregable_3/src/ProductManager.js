const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.products = [];
    this.path = path;
  }

  //-----ADD PRODUCTS-----

  async addProduct(product) {
    const productExists = this.products.findIndex((newProduct) => {
      if (newProduct.code === product.code) {
        return true;
      } else {
        return false;
      }
    });

    if (productExists !== -1) {
      console.log("This product code already exists.");
      return "This product code already exists.";
    }

    if (
      product.title !== "" &&
      product.description !== "" &&
      product.price > 0 &&
      product.thumbnail !== "" &&
      product.code > 0 &&
      product.stock > 0
    ) {
      const newProduct = {
        id: this.products.length + 1,
        title: product.title,
        description: product.description,
        price: product.price,
        thumbnail: product.thumbnail,
        code: product.code,
        stock: product.stock,
      };

      this.products.push(newProduct);

      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.products, null, 2)
      );
      console.log(`The product "${product.title}" was added correctly`);
    } else {
      return "Error: All fields are required.";
    }

    // this.products = await this.getProducts();
  }

  //-----GET PRODUCTS-----

  readProducts = async () => {
    let response = await fs.promises.readFile(this.path, "utf-8");
    return JSON.parse(response);
  };

  getProducts = async () => {
    try {
      let filterGet = await this.readProducts();
      return console.log(filterGet);
    } catch (err) {
      console.log("Error al leer el archivo", { err });
    }

    // this.products = [];

    return [];
  };

  //-----GET PRODUCTS BY ID-----

  getProductById = async (id) => {
    let filterId = await this.readProducts();
    let searchProductId = filterId.find((newProduct) => newProduct.id === id);
    console.log(searchProductId);

    if (!searchProductId) {
      const error = "Not found";
      console.log(error);
      return error;
    }
    return searchProductId;
  };

  //-----DELETE PRODUCTS BY ID-----

  deleteProductsById = async (id) => {
    let filterDelete = await this.readProducts();
    let deleteProduct = filterDelete.filter(
      (newProduct) => newProduct.id !== id
    );
    await fs.promises.writeFile(
      this.path,
      JSON.stringify(deleteProduct, null, 2)
    );
    console.log("Removed Product");
  };

  //-----UPDATE PRODUCTS-----

  modifyProduct = async (id) => {
    let modifyDelete = await this.readProducts();
    let modifyProduct = modifyDelete.filter(
      (newProduct) => newProduct.id !== id
    );
    await fs.promises.writeFile(
      this.path,
      JSON.stringify(modifyProduct, null, 2)
    );
    console.log("Product update successfully");
  };

  updateProducts = async ({ id, ...items }) => {
    await this.modifyProduct(id);
    let activeProducts = await this.readProducts();
    // console.log(activeProducts);
    let updateProduct = [{ id, ...items }, ...activeProducts];
    // console.log(updateProduct)
    await fs.promises.writeFile(
      this.path,
      JSON.stringify(updateProduct, null, 2)
    );
  };
}

//-----TEST-----

// const manager = new ProductManager("./products.json");

// console.log(manager.getProducts());

// manager.getProducts();

const product1 = {
  title: "Apple",
  description: "Sweet Fruit",
  price: 300,
  thumbnail: "apple.jpg",
  code: 123,
  stock: 24,
};

const product2 = {
  title: "Pear",
  description: "Sweet Fruit",
  price: 250,
  thumbnail: "pear.jpg",
  code: 1234,
  stock: 12,
};

// manager.addProduct(product1);
// manager.addProduct(product2);

//-----PRUEBA A AGREGAR UN NUEVO PRODUCTO-----

const product3 = {
  title: "Banana",
  description: "Sweet Fruit",
  price: 150,
  thumbnail: "banana.jpg",
  code: 12345,
  stock: 12,
};

// manager.addProduct(product3);

//-----TEST PRODUCT BY ID-----

// manager.getProductById(2);

//-----TEST DELETE PRODUCT BY ID-----

// manager.deleteProductsById(2);

//-----TEST UPDATE PRODUCT-----

// manager.updateProducts({
//   id: 2,
//   title: "Pear",
//   description: "Sweet Fruit",
//   price: 650,
//   thumbnail: "pear.jpg",
//   code: 1234,
//   stock: 12,
// });

module.exports = ProductManager;
