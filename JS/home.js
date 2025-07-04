// importing
import {initNavigation} from './header.js';
import {sliderData, categoryList, productList} from '../data.js';
import {priceFormat} from './JS/utils.js';


/* 
  *
  ** HERO SLIDER
  
*/

// Cach DOM elements
const next = document.querySelector(".next");
const prev = document.querySelector(".previous");
const sliderContainer = document.querySelector(".slider-container");
const toggleBtnsContainer = document.querySelector(".toggle-btns >div");


let currentSlide = 0;

// next slide function
function nextSlide() {
  currentSlide = (currentSlide + 1) % sliderData.length;
  updateSlider(currentSlide);
}


// previous slide function
function prevSlide() {
  currentSlide = ((currentSlide - 1) + sliderData.length) % sliderData.length;
  updateSlider(currentSlide);
}



// slide at dot function
function slideAtDot() {
  toggleBtnsContainer.innerHTML = ""; // Clear existing buttons

  sliderData.forEach((_, index) => {
    const dotBtn = document.createElement("button");
    dotBtn.setAttribute("data-index", index);
    toggleBtnsContainer.appendChild(dotBtn);

    // dot btn event
    dotBtn.addEventListener('click', () => {
      toggleBtnsContainer.querySelectorAll("button")
        .forEach(b => b.classList.remove("slide-active"))

      dotBtn.classList.add("slide-active");
      updateSlider(index);
      currentSlide = index;
    })
  })
}

// Update slider
function updateSlider(currentSlide) {
  const {heading, parag, imgSrc} = sliderData[currentSlide];
  sliderContainer.innerHTML = `
    <div class="slide">
      <div class="slide-img">
        <img src=${imgSrc} alt="" loading="lazy">
      </div>
      <div class="back-ground"></div>

      <div class="slide-content">
        <h2>${heading}</h2>
        <p>${parag}</p>
        <button>Shop Now</button>
      </div>
    </div>
  `;

  // update active dot
  toggleBtnsContainer.querySelectorAll("button")
    .forEach((b, index) => {
      b.classList.toggle("slide-active", index === currentSlide)
    })
}


// InitSlider function
function initSlider() {
  if (!sliderData || !sliderData.length) {
    console.error("No slider data provided!");
    return;
  }

  slideAtDot();
  updateSlider(currentSlide);

  // add eventListeners
  next.addEventListener('click', nextSlide);
  prev.addEventListener('click', prevSlide);
}






/* 
  *
  ** PRODUCT BY CATEGORY
  
*/

// Cach DOM elements
const categoryListContainer = document.querySelector(".category-list");
const productGrid = document.querySelector(".product-grid");

// Constants
const DEFAULT_CATEGORY = "Cleansers";
const MAX_PRODUCTS_DISPLAY = 4;

// Initialize category filters
function renderCategoryFilter() {

  // Render buttons
  categoryListContainer.innerHTML = categoryList.map(category => {
    const {id, title} = category;

    if (!categoryList?.length) {
      productGrid.innerHTML = '<p>No categories available</p>';
      return;
    }

    // cleansers by default
    if (id === DEFAULT_CATEGORY) 
    return `<button class="category-active" data-category=${id}>${title}</button>`;

    return `<button class="" data-category=${id}>${title}</button>`;
  }).join("");

  const filteredList = filterProducts("Cleansers");

  if (!filterProducts || !filterProducts.length) return;
  generatePdtGrid(filteredList, );

  // Event delegation
  categoryListContainer.addEventListener('click', handleCategoryClick)
}


// handle category click
function handleCategoryClick(e) {
  if (e.target.tagName !== 'BUTTON') return;

  const categoryButtons = categoryListContainer.querySelectorAll("button");
  categoryButtons.forEach(b => b.classList.remove("category-active"));
  e.target.classList.add("category-active");

  const categoryId = e.target.dataset.category;
  if (!categoryId) return;
  const filteredList = filterProducts(categoryId);

  if (!filteredList || !filteredList.length) return;
  generatePdtGrid(filteredList, MAX_PRODUCTS_DISPLAY);
}

// Generate product grid - categories
function generatePdtGrid(list, maxProducts = MAX_PRODUCTS_DISPLAY) {
  const productsToShow = list.slice(0, maxProducts);
  let pdtGridInnerHtml = '';

  // render products
  productsToShow.map(pdt => {
    const {id, name, price, productImgs} = pdt;

    return pdtGridInnerHtml += `
      <li class="product-card" data-pdt-id=${id}>
        <div class="pdt-img">
          <img src=${productImgs[0]} alt="" loading="lazy">
        </div>

        <button class="add-to-cart">
          Quick add
          <span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </button>

        <div class="product-info">
          <h4>${name}</h4>
          <h4>$${priceFormat(price)}</h4>
        </div>
      </li>
    `
  }).join("")

  productGrid.innerHTML = pdtGridInnerHtml;
};

// filter products by category
function filterProducts(category) {
  return productList.filter(p => category === p.category)
}

// Start product grid when the DOM is ready
window.addEventListener('DOMContentLoaded', renderCategoryFilter);


// Start slider when the DOM is ready
window.addEventListener('DOMContentLoaded', initSlider);

// Start when the DOM is ready
window.addEventListener('DOMContentLoaded', initNavigation);