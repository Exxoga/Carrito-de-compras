const addProduct = document.querySelector('#products');
const addToList = document.querySelector('#cart tbody');
const showCart = document.querySelector('#showCart');
const tableCart = document.querySelector('#cart');
const added = document.querySelector('#added');

let cart = []
/* Variables */
eventListeners();
function eventListeners() {

  addProduct.addEventListener('click', addCart);

  showCart.addEventListener('click', show);


  document.addEventListener('DOMContentLoaded', () => {
    cart = JSON.parse(localStorage.getItem('cart')) || [];

    instertHTML();
    show();
  })


  tableCart.addEventListener('click', deleteProduct);
}
/* added to cart */
function addedToCart() {
  const exist = addToList.classList.contains('contain');
  if (exist) {
    const addedP = document.querySelector('#added p');
    addedP.classList.remove('added-to-cart');
    addedP.classList.remove('remove');
    addedP.classList.add('added-to-cart');

    const timer = setTimeout(() => {
      addedP.classList.add('remove');
    }, 1000);
  }
}

/* cart icon direction */


/* Delete product */
function deleteProduct(e) {
  if (e.target.classList.contains('delete-product')) {
    const infoId = e.target.getAttribute('data-id');

    cart = cart.filter(product => product.id !== infoId);

    instertHTML();
    hide();
  }
}

/* Show Table only with products */
function show() {
  if (addToList.length > 0) {
    tableCart.classList.add('visible');
  }
}


function hide() {
  if (cart === []) {
    tableCart.classList.remove('visible');
  }
}

/* Add Product */
function addCart(e) {
  if (e.target.classList.contains('add-cart')) {
    const product = e.target.parentElement;

    extractInfo(product);
  }
}


function extractInfo(product) {

  const infoProduct = {
    title: product.querySelector('h2').textContent,
    img: product.querySelector('img').src,
    price: product.querySelector('.product__price b').textContent,
    id: product.querySelector('a').getAttribute('data-id'),
    quantity: 1
  }

  if (cart.some(product => product.id === infoProduct.id)) {
    const plus = cart.map(product => {
      if (product.id === infoProduct.id) {
        product.quantity++;
        return product;
      } else {
        return product;
      }
    })

    cart = [...plus];
  } else {
    cart = [...cart, infoProduct];
  }


  instertHTML();
  addedToCart()
}

function instertHTML() {

  cleanHTML();

  cart.forEach(product => {
    const row = document.createElement('tr');
    addToList.classList.add('contain');
    row.innerHTML = `
      <td>
      <img src="${product.img}" alt="product-image" class="image">
      </td>
      <td>${product.title}</td>
      <td>${product.price}</td>
      <td>${product.quantity}</td>
      <td><a href="#" class="delete-product" data-id="${product.id}"> X </a></td>
    `
    addToList.appendChild(row);
  })

  sincronizeStorage();
}

function cleanHTML() {
  while (addToList.firstChild) {
    addToList.removeChild(addToList.firstChild);
  }
}

function sincronizeStorage() {
  localStorage.setItem('cart', JSON.stringify(cart))
}
