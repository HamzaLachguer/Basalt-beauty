// importing
import {initNavigation} from './header.js';
import {sliderData} from '../data.js';



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

// Start slider when the DOM is ready
window.addEventListener('DOMContentLoaded', initSlider)

// Start when the DOM is ready
window.addEventListener('DOMContentLoaded', initNavigation);