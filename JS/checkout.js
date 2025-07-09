// improting
import { cart } from './cart.js';
import {initNavigation} from './header.js';
import { productList } from '../data.js';
import { priceFormat } from './JS/utils.js';

// catch DOM elements
const productGrid = document.querySelector(".cart-items-list");

function renderCartItems() {
  productGrid.innerHTML = cart.map(item => {
    const product = productList.find(p => p.id === item.id);
    if (!product) return;

    const totalPrice = product.price * item.quantity;
    const isMobile = window.innerWidth <= 800;

    return isMobile? renderMobileCart(product, item)
            : renderDesktopCart(product, item, totalPrice)
  }).join("")

  hundleClickAction()
}

function renderMobileCart(product, item) {
  return `
    <li class="cart-item-card cart-item-card-${item.id}" data-item-id=${item.id}>
      <div class="product-img">
        <img src=${product.productImgs[0]} alt="" loading="lazy">
      </div>

      <div class="product-info">
        <div>
          <div class="name-size">
            <h3 class="pdt-name">${product.name}</h3>
            <h5>Size: <span>${item.size}</span></h5>
          </div>

          <div class="price">$${priceFormat(product.price)}</div>
        </div>

        <div class="quantity-remove">
          <div>
            <button class="decrement">
              <svg width="16" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <div class="quantity">${item.quantity}</div>
            <button class="increment">
              <svg width="16" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>

          <div class="remove-btn-container">
            <button class="remove-item">
              <span>Remove</span>
              <span>Remove</span>
            </button>
          </div>
        </div>
      </div>
    </li>
  `;
}

function renderDesktopCart(product, item, totalPrice) {
  return `
    <li class="desktop-cart-item-card" data-item-id=${item.id}>

      <div class="product">
        <div class="product-img">
        <img src=${product.productImgs[0]} alt="" loading="lazy">
        </div>

        <div class="name-price">
          <h3 class="pdt-name">${product.name}</h3>
          <h3 class="pdt-price">$${priceFormat(product.price)}</h3>
        </div>
      </div>

      <div></div>

      <div class="size">${item.size}</div>

      <div class="pdt-quantity">
        <button class="decrement">
          <svg width="16" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <div class="quantity">${item.quantity}</div>
        <button class="increment">
          <svg width="16" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

      <div class="total-price">${priceFormat(totalPrice)}</div>

      <div class="remove-btn-container">
        <button class="remove-item">
          <span>Remove</span>
          <span>Remove</span>
        </button>
      </div>
    </li>
  `;
}


function hundleClickAction() {
  productGrid.addEventListener('click', e => {

    const cardItem = e.target.closest("[data-item-id]");
    if (!cardItem) return;

    const itemId = cardItem.dataset.itemId;
    const cartItem = cart.find(i => i.id === itemId)
    const action =  e.target.closest(".increment") ? increment(cartItem) :
                    e.target.closest(".decrement") ? decrement(cartItem):
                    e.target.closest(".remove-item") ? removeItem(itemId): null;

    if (e.target.tagName === 'BUTTON') {
      e.preventDefault();
    }

    if (!action) return;
    renderCartItems();
  
  })
}

function increment(cartItem) {
  cartItem.quantity ++;
  localStorage.setItem('cart', JSON.stringify(cart));
}

function decrement(cartItem) {
  if (cartItem.quantity < 2) return;

  cartItem.quantity -= 1;
  localStorage.setItem('cart', JSON.stringify(cart));
}

function removeItem(itemId) {
  let newCart = cart.filter(i => i.id !== itemId);

  cart.length = 0;
  newCart.forEach(x => cart.push(x));
  localStorage.setItem('cart', JSON.stringify(cart));

  document.querySelector(`.cart-item-card-${itemId}`).remove();
  console.log(cart)
}

// seting up event lesteners
function setUpEventListeners() {
  window.addEventListener('resize', renderCartItems)
  productGrid.addEventListener('click', hundleClickAction)
}



// Start when the DOM is ready
window.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  renderCartItems();
  setUpEventListeners();
});