class ProductManager {
  constructor() {
    this.products = [];
  }

  //-----ADD PRODUCTS-----

  addProduct(product) {
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
    } else {
      return "Error: All fields are required.";
    }
  }

  //-----GET PRODUCTS-----

  getProducts() {
    return this.products;
  }

  //-----GET PRODUCTS BY ID-----

  getProductById(id) {
    const searchProductId = this.products.find(
      (newProduct) => newProduct.id === id
    );

    if (!searchProductId) {
      const error = "Not found";
      console.log(error);
      return error;
    }
    return searchProductId;
  }
}

//-----TEST-----

const manager = new ProductManager();

console.log(manager.getProducts());

const product1 = {
  title: "Apple",
  description: "Sweet Fruit",
  price: 300,
  thumbnail: "apple.jpg",
  code: 1234,
  stock: 24,
};

manager.addProduct(product1);

console.log(manager.getProducts());

//-----TEST PRODUCT 2-----

const product2 = {
  title: "Pear",
  description: "Sweet Fruit",
  price: 250,
  thumbnail: "pear.jpg",
  code: 123,
  stock: 12,
};

manager.addProduct(product2);

manager.addProduct(product1);

console.log(manager.getProducts());

const productId1 = manager.getProductById(1);
const productId2 = manager.getProductById(2);
const productId3 = manager.getProductById(3);

console.log({ productId1, productId2, productId3 });


