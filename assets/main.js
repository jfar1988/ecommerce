const grid_alt = document.querySelector(".bx-grid-alt");
const nav_menu = document.querySelector(".nav__menu");
const bx_x = document.querySelectorAll(".bx-x");
const header = document.querySelector(".header");
const navLink = document.querySelectorAll(".nav__link");
const nav__shop = document.querySelector(".nav__shop");
const cart = document.querySelector(".cart");
const products__button = document.querySelectorAll(".products__button")
const cart__container = document.querySelector(".cart__container");
const count= document.querySelector(".count")
const cart__prices = document.querySelector(".cart__prices")



grid_alt.addEventListener("click", () => {
  nav_menu.classList.toggle("show-menu");
});

navLink.forEach((e) =>
  e.addEventListener("click", () => nav_menu.classList.toggle("show-menu"))
);

window.addEventListener("scroll", function () {
  if (window.scrollY >= 50) {
    header.classList.add("scroll-header");
  } else {
    header.classList.remove("scroll-header");
  }
});

nav__shop.addEventListener("click", () => {
  cart.classList.toggle("show-cart");
});

bx_x.forEach((e) =>
  e.addEventListener("click", () => {
    nav_menu.classList.remove("show-menu");
    cart.classList.remove("show-cart");
  })
);
const productsAll = [
  {
    id: 1,
    name: 'Hoodies',
    price: 14.00,
    image: 'assets/img/featured1.png',
    category: 'hoodies',
    quantity: 10
  },
  {
    id: 2,
    name: 'Shirts',
    price: 24.00,
    image: 'assets/img/featured2.png',
    category: 'shirts',
    quantity: 15
  },
  {
    id: 3,
    name: 'Sweatshirts',
    price: 24.00,
    image: 'assets/img/featured3.png',
    category: 'sweatshirts',
    quantity: 20
  }
]
let objCartShop = {};

function addProduct(idProduct) {
  const currentProduct = productsAll.find((e) => e.id === idProduct);

  if (currentProduct.quantity === objCartShop[idProduct].amount)
      return alert("No hay mas productos en el stock");

  objCartShop[currentProduct.id].amount++;
}

function deleteProduct(idProduct) {
    const op = confirm("Seguro que quieres eliminar?");

    if (op) {
        delete objCartShop[idProduct];
    }
}

function countProduct() {
  const arrayCartShop = Object.values(objCartShop);

  let suma = arrayCartShop.reduce((acum, curr) => {
      acum += curr.amount;
      return acum;
  }, 0);
  count.textContent = suma;
  
}

function printTotal() {
  const arrayCartShop = Object.values(objCartShop);

  if (!arrayCartShop.length)
      return (cart__container.innerHTML = `<div class="cart__empty">
      <img src="assets/img/empty-cart.png" alt="empty cart">
      <h2>Your cart is empty</h2>
      <p>You can add items to your cart by clicking on the "<i class="bx bx-plus"></i>" button on the product page.</p>
    </div>`, cart__prices.innerHTML = `
    <span>Total a pagar: </span>
    <span class="cart__prices-total" id="cart-total"> $0</span>      
    ` );

  let total = arrayCartShop.reduce((acum, curr) => {
      acum += curr.price * curr.amount;
      return acum;
  }, 0);

  cart__prices.innerHTML = `
  <span>Total a pagar: </span>
  <span class="cart__prices-total" id="cart-total"> $${total}</span>
  <button class="btn btn__buy">Comprar</button>      
  `;
}

function printProductsInCart(){
  let html = "";

  const productsAll = Object.values(objCartShop);

  productsAll.forEach(({ id, name, price, image, amount, quantity}) => {
      html += `
      <div class="cart__card">
            <div class="card__img">
                <img src="${image}" alt="${name}">
            </div>
            <div class="card__body">
                <h3>${name}</h3>
                <p><span>Stock: ${quantity}</span> | <strong>$${price}</strong></p>
                <div class="card__options">
                    <button class="btn btn__rest" id="${id}">-</button>
                    <spam>${amount}</spam>
                    <button class="btn btn__add" id="${id}">+</button>
                    <button class="btn btn__del" id="${id}">del</button>
                </div>
              </div>
        </div>
      `;
  });

  cart__container.innerHTML = html;
  countProduct();
  printTotal()
}

products__button.forEach(e=>e.addEventListener("click", (e) => {
  if (e.target.classList.contains("plus") || e.target.classList.contains("products__button")) {
      const idProduct = Number(e.target.id);
      const currentProduct = productsAll.find((p) => p.id === idProduct);

      if (objCartShop[currentProduct.id]) {
        addProduct(idProduct) 
      } else {
          objCartShop[currentProduct.id] = currentProduct;
          objCartShop[currentProduct.id].amount = 1;
      }

      printProductsInCart();
  }
}));

cart__container.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn__add")) {
      const idProduct = Number(e.target.id);
      addProduct(idProduct)
  }

  if (e.target.classList.contains("btn__rest")) {
      const idProduct = Number(e.target.id);

      if (objCartShop[idProduct].amount === 1) {
        deleteProduct(idProduct);
    } else {
        objCartShop[idProduct].amount--;
    }
  }

  if (e.target.classList.contains("btn__del")) {
      const idProduct = Number(e.target.id);
      deleteProduct(idProduct);
  }

  printProductsInCart();
});
cart__prices.addEventListener("click", (e) => {

  if (e.target.classList.contains("btn__buy")) {
      const op = confirm("Estas seguro de esto?");

      if (op) {
        let aux = productsAll.map((product) => {
              if (objCartShop[product.id]?.id === product.id) {
                  return {
                      ...product,
                      stock: product.quantity - objCartShop[product.id].amount,
                  };
              } else {
                  return product;
              }
            });
            console.log(aux);

          objCartShop = {};
          // printFoods(); si quiero que el stock baje debo crear la funcion que imprima mis productos
          printProductsInCart();
      }
  }
});
mixitup('.products__content', {
  selectors: {
    target: '.products__card'
  },
  animation: {
    duration: 300
  }
}).filter('all')

printTotal()